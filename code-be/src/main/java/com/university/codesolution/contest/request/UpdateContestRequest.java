package com.university.codesolution.contest.request;

import com.university.codesolution.contest.entity.Contest;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

public record UpdateContestRequest(
    @Schema(
        description = "ID of the contest to be updated",
        example = "123",
        requiredMode = Schema.RequiredMode.REQUIRED
    )
    Long id,

    @Schema(
        description = "New title for the contest",
        example = "Updated Contest Title",
        requiredMode = Schema.RequiredMode.REQUIRED
    )
    String title,

    @Schema(
        description = "New description for the contest",
        example = "This is the updated description of the contest.",
        requiredMode = Schema.RequiredMode.REQUIRED
    )
    String desc,

    @Schema(
        description = "New start time for the contest",
        example = "2024-04-01T10:00:00",
        requiredMode = Schema.RequiredMode.REQUIRED
    )
    LocalDateTime startTime,

    @Schema(
        description = "New end time for the contest",
        example = "2024-04-15T18:00:00",
        requiredMode = Schema.RequiredMode.REQUIRED
    )
    LocalDateTime endTime,

    @Schema(
        description = "New duration for the contest in milliseconds",
        example = "10800000",
        requiredMode = Schema.RequiredMode.REQUIRED
    )
    long durationInMillis,

    @Schema(
        description = "New status for the contest",
        example = "IN_PROCESS",
        requiredMode = Schema.RequiredMode.REQUIRED
    )
    Contest.EStatus status
) {}
