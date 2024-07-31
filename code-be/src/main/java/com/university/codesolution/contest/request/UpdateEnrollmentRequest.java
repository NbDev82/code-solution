package com.university.codesolution.contest.request;

import com.university.codesolution.contest.entity.ContestEnrollment;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public record UpdateEnrollmentRequest(
        @Schema(
                description = "ID of the contest enrollment to be updated",
                example = "123",
                requiredMode = Schema.RequiredMode.REQUIRED
        )
        Long enrollmentId,

        @Schema(
                description = "New score for the enrollment",
                example = "85.5",
                requiredMode = Schema.RequiredMode.REQUIRED
        )
        @Min(value = 0)
        @Max(value = 100)
        double score,

        @Schema(
                description = "Flag indicating if the submission was accepted",
                example = "true",
                requiredMode = Schema.RequiredMode.REQUIRED
        )
        boolean acceptedSubmission,

        @Schema(
                description = "New status for the enrollment",
                example = "ACCEPTED",
                requiredMode = Schema.RequiredMode.REQUIRED
        )
        ContestEnrollment.EStatus status
) {}