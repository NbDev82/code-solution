package com.university.codesolution.submitcode.strategy;

import com.university.codesolution.submitcode.ECompilerConstants;
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
import javax.tools.*;
import java.io.File;
import java.io.IOException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JavaCompiler implements CompilerStrategy{
    public static final String FILE_NAME = "Solution.java";
    private static final Logger log = LogManager.getLogger(JavaCompiler.class);

    private final ParameterService parameterService;

    public JavaCompiler(ParameterService parameterService) {
        this.parameterService = parameterService;
    }

    private boolean hasMatchingDataTypesAndOutput(TestCaseResultDTO testCaseResultDTO) {
        return testCaseResultDTO.getOutputDatatype().equals(testCaseResultDTO.getExpectedDatatype()) &&
                testCaseResultDTO.getOutputData().equals(testCaseResultDTO.getExpected());
    }


    @Override
    public ResultDTO run(String code, Problem problem) {
        MemoryMXBean memoryMXBean = ManagementFactory.getMemoryMXBean();
        List<TestCaseResultDTO> testCaseResultDTOs = new ArrayList<>();
        ResultDTO.ResultDTOBuilder builder = ResultDTO.builder();

        String functionName = problem.getFunctionName();

        double memoryUsedAverage = 0;
        double runtimeAverage = 0;
        int maxTestCase = 0;

        List<TestCase> testCases = problem.getTestCases();

        for(TestCase testCase: testCases){
            String runCode = createRunCode(code, testCase.getParameters(), functionName, problem.getOutputDataType());

            try {
                writeFile("Solution.java",runCode);
                CompilerResult compile = compile(code,"Solution.java");

                if(compile.getCompilerConstants() != ECompilerConstants.SUCCESS) {
                    return createCompilationFailureResult(compile);
                }

                long startTimeMillis = System.currentTimeMillis();
                long startMemoryBytes = memoryMXBean.getHeapMemoryUsage().getUsed();

                TestCaseResultDTO testCaseResultDTO = runWithTestCase(functionName);

                long endTimeMillis = System.currentTimeMillis();
                long endMemoryBytes = memoryMXBean.getHeapMemoryUsage().getUsed();

                double runtimeSeconds = (endTimeMillis - startTimeMillis) / 1000.0;
                double memoryUsedMB = (endMemoryBytes - startMemoryBytes) / (1024.0 * 1024.0);

                testCaseResultDTO.setInput(generateParameterInput(testCase.getParameters()));
                testCaseResultDTO.setExpectedDatatype(problem.getOutputDataType());
                testCaseResultDTO.setExpected(testCase.getOutputData());
                testCaseResultDTO.setPassed(hasMatchingDataTypesAndOutput(testCaseResultDTO));

                testCaseResultDTOs.add(testCaseResultDTO);

                if(!testCaseResultDTO.isPassed()) {
                    builder.lastTestcase(testCaseResultDTO);
                    break;
                }
                maxTestCase++;
                memoryUsedAverage += memoryUsedMB;
                runtimeAverage += runtimeSeconds;
            } finally {
                deleteFileCompiled();
            }
        }

        boolean isAccepted = testCases.size() == maxTestCase;

        return builder
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

    private ResultDTO createCompilationFailureResult(CompilerResult compilerResult) {
        String message;
        EStatus status;

        switch (compilerResult.getCompilerConstants()) {
            case ERROR:
                message = "Testcase not valid!";
                status = EStatus.COMPILE_ERROR;
                break;
            case SYNTAX_ERROR:
                message = compilerResult.getError();
                status = EStatus.SYNTAX_ERROR;
                break;
            case CLASS_NOT_FOUND:
                message = "Class not found!";
                status = EStatus.CLASS_NOT_FOUND;
                break;
            case TYPE_NOT_PRESENT:
                message = "Type not present!";
                status = EStatus.TYPE_NOT_PRESENT;
                break;
            default:
                log.warn("Unexpected compilation error: {}", compilerResult.getCompilerConstants());
                return null;
        }

        return ResultDTO.builder()
                .status(status)
                .message(message)
                .build();
    }


    @Override
    public String createRunCode(String code, List<Parameter> parameters, String functionName, String outputDataType) {
        int firstBraceIndex = code.indexOf("{") + 1;
        int lastBraceIndex = code.length() - 3;

        String header = code.substring(0, firstBraceIndex);
        String body = code.substring(firstBraceIndex, lastBraceIndex);
        String footer = code.substring(lastBraceIndex);

        String parameterDeclarations = generateParameterDeclarations(parameters);

        String parameterReferences = parameters.stream()
                .map(Parameter::getName)
                .collect(Collectors.joining(", "));

        String staticMethod = String.format(
                """
                       public static %s %s() {
                        \t return %s(%s);
                        }
                        """,
                outputDataType,
                functionName,
                functionName,
                parameterReferences
        );
        return header + "\n" +  parameterDeclarations  + body + "\n" + staticMethod + footer;
    }

    public String generateParameterDeclarations(List<Parameter> parameters) {
        return parameters.stream()
                .map(p -> String.format("public static %s %s = %s;\n", p.getInputDataType(), p.getName(), p.getInputData()))
                .collect(Collectors.joining("\n\t"));
    }

    private String generateParameterInput(List<Parameter> parameters) {
        return parameters.stream()
                .map(p -> String.format("%s = %s\n", p.getName(), p.getInputData()))
                .collect(Collectors.joining("\n\t"));
    }

    private void validateTestCase(TestCase testCase) {
        if (testCase == null) {
            throw new IllegalArgumentException("Test case cannot be null");
        }
    }

    @Override
    public String createInputCode(Problem problem, String code, TestCase testCase) {
        validateTestCase(testCase);

        StringBuilder listParameter = parameterService.createListParameter(testCase.getParameters());
        String importStatements = createImportStatements(problem);

        return String.format(
                """
                        %s
                        public class Solution {
                        \tpublic static %s %s (%s) {
                        \t\t%s
                        \t}
                        }
                        """,
                importStatements,
                problem.getOutputDataType(),
                problem.getFunctionName(),
                listParameter,
                code);
    }

    private String createImportStatements(Problem problem) {
        return problem.getLibrariesSupports().stream()
                .map(LibrariesSupport::getName)
                .map(name -> "import " + name + ";\n")
                .collect(Collectors.joining());
    }

    private Class<?> loadClass() throws IOException, ClassNotFoundException, java.lang.ClassNotFoundException {
        URLClassLoader classLoader = URLClassLoader.newInstance(new URL[]{new File("").toURI().toURL()});
        return Class.forName("Solution", true, classLoader);
    }

    public TestCaseResultDTO runWithTestCase(String functionName){
        TestCaseResultDTO.TestCaseResultDTOBuilder testCaseResultDTO = TestCaseResultDTO.builder();
        try {
            // Compilation success, load and execute the class
            Class<?> cls = loadClass();
            Method method = cls.getDeclaredMethod(functionName);

            // Invoke the method based on its static nature
            Object result = Modifier.isStatic(method.getModifiers())
                    ? method.invoke(null)              // Invoke static method
                    : method.invoke(cls.getDeclaredConstructor().newInstance());  // Invoke instance method

            Class<?> returnDataType = method.getReturnType();
            String returnValue = result.toString();
            log.info("Return value: {}", returnValue);

            testCaseResultDTO
                    .outputData(returnValue)
                    .outputDatatype(returnDataType.getName());
        } catch (ReflectiveOperationException | IOException e) {
            log.warn("Error executing method: {}", e.getMessage());
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
    public CompilerResult compile(String code, String fileName) {
        javax.tools.JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();

        if (compiler == null) {
            return new CompilerResult(ECompilerConstants.COMPILER_NOT_FOUND);
        }

        try (StandardJavaFileManager fileManager = compiler.getStandardFileManager(null, null, null)) {
            JavaFileObject compilationUnit = getFileObject(fileName, fileManager);
            List<JavaFileObject> compilationUnits = Collections.singletonList(compilationUnit);

            DiagnosticCollector<JavaFileObject> diagnostics = new DiagnosticCollector<>();
            javax.tools.JavaCompiler.CompilationTask task = compiler.getTask(null, fileManager, diagnostics, null, null, compilationUnits);

            // Explicitly check for compilation errors
            boolean compilationSuccess = task.call();

            if (!compilationSuccess) {
                final StringBuilder errorStringBuilder = getErrorStringBuilder(diagnostics);
                return new CompilerResult(ECompilerConstants.COMPILATION_ERROR, errorStringBuilder.toString());
            }
            return new CompilerResult(ECompilerConstants.SUCCESS);
        } catch (Exception e) {
            log.error("Compilation failed: {}", e.getMessage());
            return new CompilerResult(ECompilerConstants.COMPILATION_FAILED, e.getMessage());
        }
    }

    private static StringBuilder getErrorStringBuilder(DiagnosticCollector<JavaFileObject> diagnostics) {
        List<Diagnostic<? extends JavaFileObject>> errors = diagnostics.getDiagnostics();
        StringBuilder errorStringBuilder = new StringBuilder();
        errors.forEach(error -> {
            errorStringBuilder
                    .append("Line ")
                    .append(error.getLineNumber())
                    .append(" : ")
                    .append(error.getMessage(null))
                    .append("\n");
            log.error("Compilation error: Line {} {}", error.getLineNumber() ,error.getMessage(null));
        });
        return errorStringBuilder;
    }

    //http://www.java2s.com/example/java-api/javax/tools/javafilemanager/getjavafileforinput-3-0.html
    private JavaFileObject getFileObject(String fileName, StandardJavaFileManager fileManager) throws IOException {
        JavaFileObject fileObject = fileManager.getJavaFileForInput(StandardLocation.PLATFORM_CLASS_PATH, fileName, JavaFileObject.Kind.CLASS);
        if (fileObject != null)
            return fileObject;

        fileObject = fileManager.getJavaFileForInput(StandardLocation.CLASS_PATH, fileName,
                JavaFileObject.Kind.CLASS);
        if (fileObject != null)
            return fileObject;

        return fileManager.getJavaFileObjects(fileName).iterator().next();
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
