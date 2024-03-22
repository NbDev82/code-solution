package com.university.codesolution.submitcode.strategy;

import com.university.codesolution.submitcode.DTO.ResultDTO;
import com.university.codesolution.submitcode.parameter.entity.Parameter;
import com.university.codesolution.submitcode.problem.entity.Problem;
import com.university.codesolution.submitcode.testcase.entity.TestCase;

import java.util.List;

public interface CompilerStrategy {
    String createInputCode(Problem problem, String code, TestCase testCase);
    String createRunCode(String code, List<Parameter> parameters, String functionName, String outputDataType);

    void writeFile(String fileName, String code);
    void deleteFileCompiled();
    CompilerResult compile(String code, String fileName);
    ResultDTO run(String code, Problem problem);
}
