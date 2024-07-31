package com.university.codesolution.contest.controller;

import com.university.codesolution.contest.Constants;
import com.university.codesolution.contest.dto.ContestEnrollmentDTO;
import com.university.codesolution.contest.entity.ContestEnrollment;
import com.university.codesolution.contest.request.AddEnrollmentRequest;
import com.university.codesolution.contest.request.GetEnrollmentsRequest;
import com.university.codesolution.contest.request.UpdateEnrollmentRequest;
import com.university.codesolution.contest.service.ContestEnrollmentService;
import com.university.codesolution.login.dto.UserDTO;
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
            summary = "Update Enrollment Status",
            description = "Update the status of an existing enrollment by providing the enrollment ID and a new status.",
            responses = {
                    @ApiResponse(
                            description = "Contest enrollment status updated successfully.",
                            responseCode = "200"
                    )
            }
    )
    @PutMapping("/update-enrollment-status")
    public ResponseEntity<String> updateEnrollmentStatus(
            @Schema(description = "ID of the enrollment to delete", example = "123")
            @RequestParam("enrollmentId")
            Long enrollmentId,

            @Schema(description = "New status for the enrollment", example = "ACCEPTED")
            @RequestParam("status")
            ContestEnrollment.EStatus status) {

        contestEnrollmentService.updateStatus(enrollmentId, status);
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

    @GetMapping("/get-participants-by-contest")
    public ResponseEntity<List<UserDTO>> getParticipantsByContest(
            @Schema(
                    description = "ID of the contest",
                    example = "12",
                    requiredMode = Schema.RequiredMode.REQUIRED
            )
            @RequestParam("contestId")
            Long contestId
    ) {
        List<UserDTO> userDTOs = contestEnrollmentService.getParticipantsByContest(contestId);
        return ResponseEntity.ok(userDTOs);
    }

    @GetMapping("get-users-to-invite-by-name")
    public ResponseEntity<List<UserDTO>> getUsersToInviteByName(
            @Schema(
                    description = "ID of the contest",
                    example = "12",
                    requiredMode = Schema.RequiredMode.REQUIRED
            )
            @RequestParam("contestId")
            Long contestId,

            @Schema(
                    description = "The name or partial name to search for matching users. " +
                                "This can be a full or partial match against the user's name.",
                    example = "Long",
                    requiredMode = Schema.RequiredMode.REQUIRED
            )
            @RequestParam("nameToSearch")
            String nameToSearch,

            @RequestParam(name = "page", defaultValue = "0")
            @Schema(description = "Page number (starts from 0)", example = "0")
            int page,

            @RequestParam(name = "size", defaultValue = "10")
            @Schema(description = "Number of items per page", example = "10")
            int size
    ) {
        List<UserDTO> userDTOs = contestEnrollmentService.getUsersToInviteByName(contestId, nameToSearch, page, size);
        return ResponseEntity.ok(userDTOs);
    }

    @Operation(
            summary = "Invite user",
            responses = {
                    @ApiResponse(
                            description = "Contest enrollment added successfully.",
                            responseCode = "201"
                    )
            }
    )
    @PostMapping("/invite-user")
    public ResponseEntity<String> inviteUser(
            @Schema(
                    description = "ID of the contest",
                    example = "12",
                    requiredMode = Schema.RequiredMode.REQUIRED
            )
            @RequestParam("contestId")
            Long contestId,

            @Schema(
                    description = "ID of the user",
                    example = "98",
                    requiredMode = Schema.RequiredMode.REQUIRED
            )
            @RequestParam("userId")
            Long userId
    ) {
        ContestEnrollmentDTO enrollmentDTO = contestEnrollmentService.inviteUser(contestId, userId);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(String.valueOf(enrollmentDTO.getId()));
    }
}
