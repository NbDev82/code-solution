package com.university.codesolution.contest.request;

import com.university.codesolution.contest.entity.ContestEnrollment;

public record UpdateEnrollmentRequest(
        Long contestEnrollmentId,
        double score,
        boolean acceptedSubmission,
        ContestEnrollment.EType type,
        ContestEnrollment.EStatus status
) {}
