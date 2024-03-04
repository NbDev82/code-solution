package com.university.codesolution.submitcode.strategy;

import com.university.codesolution.login.entity.User;
import com.university.codesolution.submitcode.DTO.ResultDTO;
import com.university.codesolution.submitcode.problem.entity.Problem;
import com.university.codesolution.submitcode.submission.entity.Submission;
import com.university.codesolution.submitcode.submission.enums.ELanguage;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;

public class CompilerProcessor {
    private final CompilerStrategy compilerStrategy;

    public CompilerProcessor(CompilerStrategy compilerStrategy) {
        this.compilerStrategy = compilerStrategy;
    }

    public ResultDTO run(String code,
                         Problem problem) {
        return compilerStrategy.run(code, problem);
    }
}
