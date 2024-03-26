package com.university.codesolution.contest.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import org.springframework.web.bind.annotation.RequestParam;

public record GetContestsRequest(
    @RequestParam("userId")
    @Schema(description = "ID of the user to retrieve contests for", example = "123")
    Long userId,

    @RequestParam(name = "page", defaultValue = "0")
    @Schema(description = "Page number (starts from 0)", example = "0")
    @Min(value = 1)
    int page,

    @RequestParam(name = "size", defaultValue = "10")
    @Schema(description = "Number of items per page", example = "10")
    @Min(value = 1)
    int size
) {}
