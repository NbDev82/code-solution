package com.university.codesolution.submitcode.problem.service;

import com.university.codesolution.submitcode.DTO.ProblemDTO;

public interface ProblemService {
    ProblemDTO getByProblemName(String problemName);
}
