package com.university.codesolution.contest.request;

import io.swagger.v3.oas.annotations.media.Schema;

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
        description = "New duration for the contest in milliseconds",
        example = "10800000",
        requiredMode = Schema.RequiredMode.REQUIRED
    )
    long durationInMillis
) {}
