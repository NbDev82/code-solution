package com.university.codesolution.contest.controller;

import com.university.codesolution.contest.Constants;
import com.university.codesolution.contest.dto.ContestEnrollmentDTO;
import com.university.codesolution.contest.entity.ContestEnrollment;
import com.university.codesolution.contest.request.AddEnrollmentRequest;
import com.university.codesolution.contest.request.GetEnrollmentsRequest;
import com.university.codesolution.contest.request.UpdateEnrollmentRequest;
import com.university.codesolution.contest.service.ContestEnrollmentService;
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

import java.util.List;

@RestController
@RequestMapping("/api/contest-enrollments")
@RequiredArgsConstructor
@Tag(name = "Contest enrollment")
public class ContestEnrollmentController {

    private static final Logger log = LogManager.getLogger(ContestEnrollmentController.class);

    private final ContestEnrollmentService contestEnrollmentService;

    @Operation(
            summary = "Add Enrollment",
            description = "Add a new enrollment by providing the necessary details in the request body.",
            responses = {
                    @ApiResponse(
                            description = "Contest enrollment added successfully.",
                            responseCode = "201"
                    )
            }
    )
    @PostMapping("/add-enrollment")
    public ResponseEntity<String> addEnrollment(@RequestBody @Valid AddEnrollmentRequest request) {
        contestEnrollmentService.add(request);
        log.info(Constants.CONTEST_ENROLLMENT_ADDED_SUCCESSFULLY);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Constants.CONTEST_ENROLLMENT_ADDED_SUCCESSFULLY);
    }

    @Operation(
            summary = "Update Enrollment",
            description = "Update the details of an existing enrollment by providing the necessary updates in the request body.",
            responses = {
                    @ApiResponse(
                            description = "Contest enrollment updated successfully.",
                            responseCode = "200"
                    )
            }
    )
    @PutMapping("/update-enrollment")
    public ResponseEntity<String> updateEnrollment(@RequestBody @Valid UpdateEnrollmentRequest updateRequest) {
        contestEnrollmentService.update(updateRequest);
        log.info(Constants.CONTEST_ENROLLMENT_UPDATED_SUCCESSFULLY);
        return ResponseEntity.ok(Constants.CONTEST_ENROLLMENT_UPDATED_SUCCESSFULLY);
    }

    @Operation(
            summary = "Delete Enrollment",
            description = "Delete an existing enrollment by providing the enrollment ID in the path.",
            responses = {
                    @ApiResponse(
                            description = "Contest enrollment deleted successfully.",
                            responseCode = "200"
                    )
            }
    )
    @DeleteMapping("/delete-enrollment/{contestEnrollmentId}")
    public ResponseEntity<String> deleteContest(
            @Schema(description = "ID of the enrollment to delete", example = "123")
            @PathVariable("contestEnrollmentId")
            Long contestEnrollmentId) {

        contestEnrollmentService.updateStatus(contestEnrollmentId, ContestEnrollment.EStatus.EXPIRED);
        log.info(Constants.CONTEST_DELETED_SUCCESSFULLY);
        return ResponseEntity.ok(Constants.CONTEST_DELETED_SUCCESSFULLY);
    }

    @Operation(
            summary = "Get Enrollments",
            description = "Retrieve enrollments for a specific contest by providing the contest ID.",
            responses = {
                    @ApiResponse(
                            description = "Enrollments retrieved successfully.",
                            responseCode = "200"
                    )
            }
    )
    @GetMapping("/get-enrollments")
    public ResponseEntity<List<ContestEnrollmentDTO>> getEnrollments(
            @Valid GetEnrollmentsRequest getRequest) {
        List<ContestEnrollmentDTO> contestDTOs = contestEnrollmentService.getEnrollments(getRequest);
        log.info(Constants.CONTEST_ENROLLMENTS_RETRIEVED_SUCCESSFULLY);
        return ResponseEntity.ok(contestDTOs);
    }

    @Operation(
            summary = "Get enrollment",
            description = "Retrieve an enrollment by providing the contest ID and user ID",
            responses = @ApiResponse(
                    description = "An enrollment retrieved successfully",
                    responseCode = "200"
            )
    )
    @GetMapping("/get-enrollment")
    public ResponseEntity<ContestEnrollmentDTO> getEnrollment(
            @Schema(description = "ID of the contest", example = "1")
            @RequestParam("contestId")
            Long contestId,

            @Schema(description = "ID of the user", example = "1")
            @RequestParam("userId")
            Long userId) {

        ContestEnrollmentDTO contestEnrollmentDTO = contestEnrollmentService.getEnrollment(contestId, userId);
        log.info(Constants.CONTEST_ENROLLMENT_RETRIEVED_SUCCESSFULLY);
        return ResponseEntity.ok(contestEnrollmentDTO);
    }
}
