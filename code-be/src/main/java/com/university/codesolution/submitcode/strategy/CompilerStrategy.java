package com.university.codesolution.submitcode.strategy;

import com.university.codesolution.login.entity.User;
import com.university.codesolution.submitcode.DTO.ResultDTO;
import com.university.codesolution.submitcode.problem.entity.Problem;
import com.university.codesolution.submitcode.testcase.entity.TestCase;

public interface CompilerStrategy {
    String createInputCode(Problem problem, String code, TestCase testCase);
    void writeFile(String fileName, String code);
    void deleteFileCompiled();
    boolean compile(String code, String fileName);
    ResultDTO run(String code, Problem problem);
}
