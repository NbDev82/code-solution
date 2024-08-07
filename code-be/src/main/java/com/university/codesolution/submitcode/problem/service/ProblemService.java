package com.university.codesolution.submitcode.problem.service;

import com.university.codesolution.submitcode.DTO.ProblemDTO;
import com.university.codesolution.submitcode.problem.entity.Problem;
import com.university.codesolution.submitcode.request.AddProblemRequest;

import java.util.List;

public interface ProblemService {
    Problem getEntityByProblemId(Long problemId);

    <T> T findById(Long problemId, Class<T> returnType);
    List<Problem> getAll();
    List<ProblemDTO> getAllDTOs();

    List<ProblemDTO> getProblemsByOwner(Long userId);

    List<ProblemDTO> getProfileProblemsByOwner(Long userId);

    List<ProblemDTO> getProblemsByOwnerAndName(Long userId, String problemName);

    Boolean add(AddProblemRequest request);

    Boolean delete(Long problemId);

    Problem getRandomProblem();
}
