package com.university.codesolution.submitcode.problem.service;

import com.university.codesolution.submitcode.DTO.ProblemDTO;
import com.university.codesolution.submitcode.problem.entity.Problem;

public interface ProblemService {
    Problem getEntityByProblemId(Long problemId);

    ProblemDTO findById(Long problemId);
}
