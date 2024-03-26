package com.university.codesolution.contest.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import org.springframework.web.bind.annotation.RequestParam;

public record GetEnrollmentRequest(
        @RequestParam("contestId")
        @Schema(description = "ID of the contest to retrieve enrollments for", example = "456")
        Long contestId,

        @RequestParam(name = "page", defaultValue = "0")
        @Schema(description = "Page number (starts from 0)", example = "0")
        @Min(value = 0, message = "Page number must be greater than or equal to 0")
        int page,

        @RequestParam(name = "size", defaultValue = "10")
        @Schema(description = "Number of items per page", example = "10")
        @Min(value = 1, message = "Size must be greater than or equal to 1")
        int size
) {}
