package com.university.codesolution.submitcode.strategy;

import com.university.codesolution.submitcode.DTO.ResultDTO;
import com.university.codesolution.submitcode.problem.entity.Problem;

public class CompilerProcessor {
    private final CompilerStrategy compilerStrategy;

    public CompilerProcessor(CompilerStrategy compilerStrategy) {
        this.compilerStrategy = compilerStrategy;
    }

    public ResultDTO run(String code, Problem problem) {
        return compilerStrategy.run(code, problem);
    }
}
