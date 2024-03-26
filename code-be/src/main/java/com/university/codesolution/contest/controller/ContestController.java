package com.university.codesolution.contest.controller;

import com.university.codesolution.contest.Constants;
import com.university.codesolution.contest.dto.ContestDTO;
import com.university.codesolution.contest.entity.Contest;
import com.university.codesolution.contest.request.AddContestRequest;
import com.university.codesolution.contest.request.GetContestsRequest;
import com.university.codesolution.contest.request.UpdateContestRequest;
import com.university.codesolution.contest.service.ContestService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/contests")
@RequiredArgsConstructor
@Tag(name = "Contest")
public class ContestController {

    private static final Logger log = LogManager.getLogger(ContestController.class);

    private final ContestService contestService;

    @Operation(
            summary = "Add Contest",
            description = "Add a new contest by providing the necessary details in the request body.",
            responses = {
                    @ApiResponse(
                            description = "Contest added successfully.",
                            responseCode = "201"
                    )
            }
    )
    @PostMapping("/add-contest")
    public ResponseEntity<String> addContest(@RequestBody @Valid AddContestRequest addRequest) {
        contestService.add(addRequest);
        log.info(Constants.CONTEST_ADDED_SUCCESSFULLY);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Constants.CONTEST_ADDED_SUCCESSFULLY);
    }

    @Operation(
            summary = "Update Contest",
            description = "Update an existing contest by providing updated details in the request body.",
            responses = {
                    @ApiResponse(
                            description = "Contest updated successfully.",
                            responseCode = "200"
                    )
            }
    )
    @PutMapping("/update-contest")
    public ResponseEntity<String> updateContest(@RequestBody @Valid UpdateContestRequest updateRequest) {
        contestService.update(updateRequest);
        log.info(Constants.CONTEST_UPDATED_SUCCESSFULLY);
        return ResponseEntity.ok(Constants.CONTEST_UPDATED_SUCCESSFULLY);
    }

    @Operation(
            summary = "Update Contest Status",
            description = "Update the status of an existing contest by providing contest ID and new status.",
            responses = {
                    @ApiResponse(
                            description = "Contest status updated successfully.",
                            responseCode = "200"
                    )
            }
    )
    @PutMapping("/update-contest-status")
    public ResponseEntity<String> updateContestStatus(
            @RequestParam("contestId")
            @Schema(description = "ID of the contest", example = "123")
            Long contestId,

            @RequestParam("contestStatus")
            @Schema(description = "New status of the contest", example = "IN_PROCESS")
            Contest.EStatus contestStatus) {

        contestService.updateStatus(contestId, contestStatus);
        log.info(Constants.CONTEST_UPDATED_SUCCESSFULLY);
        return ResponseEntity.ok(Constants.CONTEST_UPDATED_SUCCESSFULLY);
    }

    @Operation(
            summary = "Delete Contest",
            description = "Delete an existing contest by providing the contest ID.",
            responses = {
                    @ApiResponse(
                            description = "Contest deleted successfully.",
                            responseCode = "200"
                    )
            }
    )
    @DeleteMapping("/delete-contest/{contestId}")
    public ResponseEntity<String> deleteContest(
            @PathVariable("contestId")
            @Schema(description = "ID of the contest to be deleted", example = "123")
            Long contestId) {
        contestService.updateStatus(contestId, Contest.EStatus.DELETED);
        log.info(Constants.CONTEST_DELETED_SUCCESSFULLY);
        return ResponseEntity.ok(Constants.CONTEST_DELETED_SUCCESSFULLY);
    }

    @Operation(
            summary = "Get Contests",
            description = "Retrieve contests for a specific user by providing the user ID.",
            responses = {
                    @ApiResponse(
                            description = "Contests retrieved successfully.",
                            responseCode = "200"
                    )
            }
    )
    @GetMapping("/get-contests/{userId}")
    public ResponseEntity<List<ContestDTO>> getContests(@Valid GetContestsRequest getRequest) {
        List<ContestDTO> contestDTOs = contestService.getContests(getRequest);
        log.info(Constants.CONTESTS_RETRIEVED_SUCCESSFULLY);
        return ResponseEntity.ok(contestDTOs);
    }
}
