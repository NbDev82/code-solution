package com.university.codesolution.contest.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import org.springframework.web.bind.annotation.RequestParam;

public record GetContestsRequestByTitle(
        @RequestParam("userId")
        @Schema(description = "ID of the user to retrieve contests for", example = "123")
        Long userId,

        @RequestParam("title")
        @Schema(description = "Title of the contest to retrieve contests for", example = "Weekly contest 1")
        String title,

        @RequestParam(name = "page", defaultValue = "1")
        @Schema(description = "Page number (starts from 1)", example = "1")
        @Min(value = 1)
        int page,

        @RequestParam(name = "size", defaultValue = "10")
        @Schema(description = "Number of items per page", example = "10")
        @Min(value = 1)
        int size
) {}
