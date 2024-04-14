package com.university.codesolution.contest.request;

import io.swagger.v3.oas.annotations.media.Schema;

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
        description = "Duration of the contest in milliseconds",
        example = "7200000",
        requiredMode = Schema.RequiredMode.REQUIRED
    )
    long durationInMillis,

    @Schema(
        description = "ID of the contest owner",
        example = "12",
        requiredMode = Schema.RequiredMode.REQUIRED
    )
    Long ownerId
) {
}
