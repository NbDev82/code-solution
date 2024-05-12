package com.university.codesolution.login.mapper;

import com.university.codesolution.login.entity.User;
import com.university.codesolution.submitcode.submission.entity.Submission;

public class UserMapperUtil {
    public static int numberOfSolvedProblems(User user) {
        return user.getSubmissions() != null ? (int) user.getSubmissions()
                .stream()
                .filter(s -> s.getStatus().equals(Submission.EStatus.ACCEPTED))
                .map(submission -> submission.getProblem().getId()) // Lấy problemId của từng Submission
                .distinct()
                .count() : 0;
    }

}
