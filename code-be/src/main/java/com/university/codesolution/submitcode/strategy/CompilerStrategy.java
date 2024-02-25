package com.university.codesolution.submitcode.strategy;

import com.university.codesolution.login.entity.User;
import com.university.codesolution.submitcode.DTO.ResultDTO;
import com.university.codesolution.submitcode.problem.entity.Problem;

public interface CompilerStrategy {
    void writeFile(String fileName, String code);
    boolean compile(String code, String fileName);
    ResultDTO run(String code, Problem problem);
}
