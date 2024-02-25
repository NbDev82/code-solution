package com.university.codesolution.submitcode.strategy;

import com.university.codesolution.submitcode.CompilerConstants;
import com.university.codesolution.submitcode.DTO.ResultDTO;
import com.university.codesolution.submitcode.DTO.TestCaseResultDTO;
import com.university.codesolution.submitcode.exception.CompilationErrorException;
import com.university.codesolution.submitcode.exception.SyntaxErrorException;
import com.university.codesolution.submitcode.exception.ClassNotFoundException;
import com.university.codesolution.submitcode.library.entity.LibrariesSupport;
import com.university.codesolution.submitcode.parameter.entity.Parameter;
import com.university.codesolution.submitcode.parameter.service.ParameterService;
import com.university.codesolution.submitcode.problem.entity.Problem;
import com.university.codesolution.submitcode.submission.enums.ELanguage;
import com.university.codesolution.submitcode.submission.enums.EStatus;
import com.university.codesolution.submitcode.testcase.entity.TestCase;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
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

            List<Object> arguments = parameterService.createArguments(parameters);
            Object[] argsArray = arguments.toArray(new Object[0]);

            double startTime = System.currentTimeMillis();
            MemoryUsage heapMemoryUsageBefore = memoryMXBean.getHeapMemoryUsage();

            TestCaseResultDTO testCaseResultDTO = runWithTestCase(functionName,argsArray);

            MemoryUsage heapMemoryUsageAfter = memoryMXBean.getHeapMemoryUsage();
            long memoryUsedBytes = heapMemoryUsageAfter.getUsed() - heapMemoryUsageBefore.getUsed();
            double memoryUsedMB = bytesToMegabytes(memoryUsedBytes);
            memoryUsedAverage += memoryUsedMB;

            double endTime = System.currentTimeMillis();
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

    public TestCaseResultDTO runWithTestCase(String functionName, Object... args){
        TestCaseResultDTO.TestCaseResultDTOBuilder testCaseResultDTO = TestCaseResultDTO.builder();

        String className = "Solution";
        try {
            // Compilation success, load and execute the class
            URLClassLoader classLoader = URLClassLoader.newInstance(new URL[]{new File("").toURI().toURL()});
            Class<?> cls = Class.forName(className, true, classLoader);
            Method method = cls.getDeclaredMethod(functionName, parameterService.getParameterTypes(args));
            Class<?> returnDataType = method.getReturnType();

            Object result;
            if (Modifier.isStatic(method.getModifiers())) {
                result = method.invoke(null, args); // Invoke static method with null instance
            } else {
                // If the method is not static, instantiate an object first
                Object obj = cls.getDeclaredConstructor().newInstance();
                result = method.invoke(obj, args); // Invoke method on the instance
            }
            // Cast the result to the expected return type
            String returnValue = result.toString();
            System.out.println("Return value: " + returnValue);

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
        if (!file.exists()) {
            try {
                FileWriter fileWriter = new FileWriter(fileName);
                fileWriter.write(code);
                fileWriter.close();
                log.info("File " + fileName + " created successfully.");
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }

    @Override
    public boolean compile(String code, String fileName) {
        javax.tools.JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
        int compilationResult = compiler.run(null, null, null, fileName);
        if (compilationResult == CompilerConstants.SUCCESS) {
            return true;
        }

        switch (compilationResult) {
            case CompilerConstants.ERROR -> throw new Error("Error");
            case CompilerConstants.SYNTAX_ERROR -> throw new SyntaxErrorException("Syntax error");
            case CompilerConstants.CLASS_NOT_FOUND -> throw new ClassNotFoundException("Class not found");
            case CompilerConstants.TYPE_NOT_PRESENT -> throw new TypeNotPresentException("Data type error", null);
            default -> {
                throw new CompilationErrorException("Compilation error occurred");
            }
        }
    }

    private long bytesToMegabytes(long bytes) {
        return bytes / (1024L * 1024L);
    }

    public void deleteFileCompiled(){
        File file = new File(FILE_NAME);
        if (file.exists()) {
            file.delete();
            log.info("File Solution.java deleted successfully.");
        }
    }
}
