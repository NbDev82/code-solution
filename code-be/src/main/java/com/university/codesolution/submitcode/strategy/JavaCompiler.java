package com.university.codesolution.submitcode.strategy;

import com.university.codesolution.submitcode.CompilerConstants;
import com.university.codesolution.submitcode.DTO.ResultDTO;
import com.university.codesolution.submitcode.DTO.TestCaseResultDTO;
import com.university.codesolution.submitcode.exception.ClassNotFoundException;
import com.university.codesolution.submitcode.library.entity.LibrariesSupport;
import com.university.codesolution.submitcode.parameter.entity.Parameter;
import com.university.codesolution.submitcode.parameter.service.ParameterService;
import com.university.codesolution.submitcode.problem.entity.Problem;
import com.university.codesolution.submitcode.submission.enums.EStatus;
import com.university.codesolution.submitcode.testcase.entity.TestCase;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import java.io.FileWriter;
import java.lang.management.ManagementFactory;
import java.lang.management.MemoryMXBean;
import java.lang.management.MemoryUsage;
import javax.tools.ToolProvider;
import java.io.File;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.ArrayList;
import java.util.List;

@Service
public class JavaCompiler implements CompilerStrategy{
    public static final String FILE_NAME = "Solution.java";
    private static final Logger log = LogManager.getLogger(JavaCompiler.class);

    private final ParameterService parameterService;

    public JavaCompiler(ParameterService parameterService) {
        this.parameterService = parameterService;
    }

    @Override
    public ResultDTO run(String code, Problem problem) {
        MemoryMXBean memoryMXBean = ManagementFactory.getMemoryMXBean();
        double memoryUsedAverage = 0;
        double runtimeAverage = 0;
        int maxTestCase = 0;

        List<TestCase> testCases = problem.getTestCases();
        List<TestCaseResultDTO> testCaseResultDTOs = new ArrayList<>();

        String functionName = problem.getFunctionName();

        for(TestCase testCase: testCases){
            List<Parameter> parameters = testCase.getParameters();

            String runCode = createRunCode(code, parameters, functionName, problem.getOutputDataType());
            String fileName = "Solution.java";
            writeFile(fileName,runCode);
            boolean isCompileSuccess = compile(code,fileName);
            if (!isCompileSuccess) {
                return ResultDTO.builder()
                        .status(EStatus.COMPILE_ERROR)
                        .message("Testcase not valid!")
                        .build();
            }

            double startTime = System.currentTimeMillis();
            MemoryUsage heapMemoryUsageBefore = memoryMXBean.getHeapMemoryUsage();

            TestCaseResultDTO testCaseResultDTO = runWithTestCase(functionName,parameters);

            double endTime = System.currentTimeMillis();
            MemoryUsage heapMemoryUsageAfter = memoryMXBean.getHeapMemoryUsage();

            long memoryUsedBytes = heapMemoryUsageAfter.getUsed() - heapMemoryUsageBefore.getUsed();
            double memoryUsedMB = bytesToMegabytes(memoryUsedBytes);
            memoryUsedAverage += memoryUsedMB;

            double runtimeSeconds = (endTime - startTime) / 1000.0;
            runtimeAverage += runtimeSeconds;

            testCaseResultDTO.setExpectedDatatype(problem.getOutputDataType());
            testCaseResultDTO.setExpected(testCase.getOutputData());
            testCaseResultDTO.setPassed(
                    testCaseResultDTO.getOutputDatatype().equals(testCaseResultDTO.getExpectedDatatype()) &&
                    testCaseResultDTO.getOutputData().equals(testCaseResultDTO.getExpected()));

            testCaseResultDTOs.add(testCaseResultDTO);

            if(!testCaseResultDTO.isPassed())
                break;
            maxTestCase +=1;
        }

        deleteFileCompiled();

        boolean isAccepted = testCases.size() == maxTestCase;

        return ResultDTO.builder()
                .message("That is your result of your code for this problem")
                .memory(memoryUsedAverage/maxTestCase)
                .runtime(runtimeAverage/maxTestCase)
                .maxTestcase(String.valueOf(testCases.size()))
                .passedTestcase(String.valueOf(maxTestCase))
                .testCaseResultDTOS(testCaseResultDTOs)
                .isAccepted(testCases.size() == maxTestCase)
                .status(isAccepted? EStatus.ACCEPTED : EStatus.WRONG_ANSWER)
                .build();
    }

    @Override
    public String createRunCode(String code, List<Parameter> parameters, String functionName, String outputDataType) {
        int index1 = code.indexOf("{");
        index1 +=1;
        int index2 = code.length()-3;
        String codeSplit1 = code.substring(0,index1);
        String codeSplit2 = code.substring(index1,index2);
        String codeSplit3 = code.substring(index2);

        StringBuilder listParamsDeclare = new StringBuilder("\n\t");
        StringBuilder listParamsRef = new StringBuilder();

        for(Parameter p: parameters) {
            String param = "public static "+ p.getInputDataType() +" " + p.getName() + " = " + p.getInputData() + ";\n";
            listParamsDeclare.append(param);
            listParamsRef.append(p.getName()).append(",");
        }
        listParamsRef = new StringBuilder(listParamsRef.substring(0, listParamsRef.length() - 1));

        StringBuilder staticMethod = new StringBuilder("\n\t");
        String staticMethodString = "public static " + outputDataType + " " + functionName + "() { return " + functionName + "("+listParamsRef+");}";
        staticMethod.append(staticMethodString);

        return codeSplit1 + listParamsDeclare + codeSplit2 + staticMethod + codeSplit3;
    }

    @Override
    public String createInputCode(Problem problem, String code, TestCase testCase) {
        if(testCase == null)
            throw new NullPointerException();

        List<Parameter> parameters = testCase.getParameters();
        StringBuilder listParameter = parameterService.createListParameter(parameters);

        List<LibrariesSupport> librariesSupports = problem.getLibrariesSupports();
        StringBuilder libraries = new StringBuilder();

        String functionName = problem.getFunctionName();
        String outputDataType = problem.getOutputDataType();
        String className = "Solution";

        librariesSupports.forEach(lib -> {
            libraries
                    .append("import ")
                    .append(lib.getName())
                    .append(";\n");
        });

        return libraries +
                "public class " + className + " {\n" +
                "    public static " + outputDataType + " " +functionName+ " ("+listParameter+") {\n" +
                "\t\t"+code + "\n" +
                "    }\n" +
                "}\n";
    }

    public TestCaseResultDTO runWithTestCase(String functionName, List<Parameter> parameters){
        TestCaseResultDTO.TestCaseResultDTOBuilder testCaseResultDTO = TestCaseResultDTO.builder();

        String className = "Solution";
        try {
            // Compilation success, load and execute the class
            URLClassLoader classLoader = URLClassLoader.newInstance(new URL[]{new File("").toURI().toURL()});
            Class<?> cls = Class.forName(className, true, classLoader);
            Method method = cls.getDeclaredMethod(functionName);
            Class<?> returnDataType = method.getReturnType();

            Object result;
            if (Modifier.isStatic(method.getModifiers())) {
                result = method.invoke(null); // Invoke static method with null instance
            } else {
                Object obj = cls.getDeclaredConstructor().newInstance();
                result = method.invoke(obj); // Invoke method on the instance
            }
            String returnValue = result.toString();
            log.info("Return value: " + returnValue);

            testCaseResultDTO
                    .outputData(returnValue)
                    .outputDatatype(returnDataType.getName());
        } catch (IOException | ClassNotFoundException | NoSuchMethodException | IllegalAccessException |
                 InvocationTargetException | InstantiationException | java.lang.ClassNotFoundException e) {
            log.info(e.getMessage());
        }
        return testCaseResultDTO.build();
    }

    @Override
    public void writeFile(String fileName, String code) {
        File file = new File(fileName);
        try {
            FileWriter fileWriter = new FileWriter(fileName);
            if(file.exists()) {
                fileWriter.write("");
            }
            fileWriter.write(code);
            fileWriter.close();
            log.info("File " + fileName + " created successfully.");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean compile(String code, String fileName) {
        javax.tools.JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
        int compilationResult = compiler.run(null, null, null, fileName);
        return compilationResult == CompilerConstants.SUCCESS;
    }

    private long bytesToMegabytes(long bytes) {
        return bytes / (1024L * 1024L);
    }


    @Override
    public void deleteFileCompiled(){
        File file = new File(FILE_NAME);
        if (file.exists()) {
            if(file.delete()) {
                log.info("File Solution.java deleted successfully.");
            }
        }
    }
}
