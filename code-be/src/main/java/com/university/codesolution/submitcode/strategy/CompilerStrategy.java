package com.university.codesolution.submitcode.strategy;

import com.university.codesolution.submitcode.DTO.ResultDTO;
import com.university.codesolution.submitcode.problem.entity.Problem;

public interface CompilerStrategy {
    ResultDTO run(String code, Problem problem);
}
