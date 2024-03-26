package com.university.codesolution.contest.request;

import com.university.codesolution.contest.entity.Contest;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

public record AddContestRequest(
    @Schema(
        description = "Title of the contest",
        example = "Weekly contest 1",
        requiredMode = Schema.RequiredMode.REQUIRED
    )
    String title,

    @Schema(
        description = "Description of the contest",
        example = "This is a sample contest description."
    )
    String desc,

    @Schema(
        description = "Start time of the contest",
        example = "2024-04-01T09:00:00",
        requiredMode = Schema.RequiredMode.REQUIRED
    )
    LocalDateTime startTime,

    @Schema(
        description = "End time of the contest",
        example = "2024-04-15T17:00:00",
        requiredMode = Schema.RequiredMode.REQUIRED
    )
    LocalDateTime endTime,

    @Schema(
        description = "Duration of the contest in milliseconds",
        example = "7200000",
        requiredMode = Schema.RequiredMode.REQUIRED
    )
    long durationInMillis,

    @Schema(
        description = "Status of the contest",
        example = "PREPARING",
        requiredMode = Schema.RequiredMode.REQUIRED
    )
    Contest.EStatus status,

    @Schema(
        description = "ID of the contest owner",
        example = "12",
        requiredMode = Schema.RequiredMode.REQUIRED
    )
    Long ownerId
) {
}
