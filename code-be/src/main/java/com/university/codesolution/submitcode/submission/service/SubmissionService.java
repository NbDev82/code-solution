package com.university.codesolution.submitcode.submission.service;

import com.university.codesolution.submitcode.DTO.ResultDTO;
import com.university.codesolution.submitcode.problem.entity.Problem;
import com.university.codesolution.submitcode.submission.entity.Submission;
import com.university.codesolution.submitcode.submission.enums.ELanguage;

import java.util.List;

public interface SubmissionService {
    String getInputCode(Problem problem, ELanguage language);
    ResultDTO compile(String code, ELanguage eLanguage);
    ResultDTO runCode(Long userId, String code, Problem problem, ELanguage eLanguage);
    void add(Submission submission);
    List<Submission> getByUserIdAndProblemId(Long userId, Long problemId);
}
