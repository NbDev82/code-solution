package com.university.codesolution.contest.request;

import com.university.codesolution.contest.entity.ContestEnrollment;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public record AddEnrollmentRequest(
    @Schema(
        description = "Score of the enrollment",
        example = "0"
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
        description = "Status of the enrollment",
        example = "PENDING_APPROVAL",
        requiredMode = Schema.RequiredMode.REQUIRED
    )
    ContestEnrollment.EStatus status,

    @Schema(
        description = "ID of the contest associated with the enrollment",
        example = "12",
        requiredMode = Schema.RequiredMode.REQUIRED
    )
    Long contestId,

    @Schema(
        description = "ID of the user associated with the enrollment",
        example = "98",
        requiredMode = Schema.RequiredMode.REQUIRED
    )
    Long userId
) {}
