package com.university.codesolution.submitcode.problem.service;

import com.university.codesolution.submitcode.DTO.ProblemDTO;
import com.university.codesolution.submitcode.problem.entity.Problem;

import java.util.List;

public interface ProblemService {
    Problem getEntityByProblemId(Long problemId);

    <T> T findById(Long problemId, Class<T> returnType);
    List<Problem> getAll();
}
