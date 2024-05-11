package com.university.codesolution.contest.request;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

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
    Long ownerId,


    @Schema(
            description = "List of problem IDs associated with the contest",
            example = "[1, 2, 3]"
    )
    List<Long> problemIds,

    @Schema(
            description = "List of participant IDs for the contest",
            example = "[1, 2]"
    )
    List<Long> participantIds
) {}
