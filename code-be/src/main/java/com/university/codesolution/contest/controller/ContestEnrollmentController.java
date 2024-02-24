package com.university.codesolution.contest.controller;

import com.university.codesolution.contest.Constants;
import com.university.codesolution.contest.dto.ContestEnrollmentDTO;
import com.university.codesolution.contest.entity.Contest;
import com.university.codesolution.contest.entity.ContestEnrollment;
import com.university.codesolution.contest.request.AddEnrollmentRequest;
import com.university.codesolution.contest.request.UpdateEnrollmentRequest;
import com.university.codesolution.contest.service.ContestEnrollmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
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
    public ResponseEntity<String> addEnrollment(@RequestBody AddEnrollmentRequest request) {
        contestEnrollmentService.add(request);
        log.info(Constants.CONTEST_ENROLLMENT_ADDED_SUCCESSFULLY);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Constants.CONTEST_ENROLLMENT_ADDED_SUCCESSFULLY);
    }

    @PutMapping("/update-enrollment")
    public ResponseEntity<String> updateEnrollment(@RequestBody UpdateEnrollmentRequest updateRequest) {
        contestEnrollmentService.update(updateRequest);
        log.info(Constants.CONTEST_ENROLLMENT_UPDATED_SUCCESSFULLY);
        return ResponseEntity.ok(Constants.CONTEST_ENROLLMENT_UPDATED_SUCCESSFULLY);
    }

    @DeleteMapping("/delete-enrollment/{contestEnrollmentId}")
    public ResponseEntity<String> deleteContest(@PathVariable("contestEnrollmentId") Long contestEnrollmentId) {
        contestEnrollmentService.updateStatus(contestEnrollmentId, ContestEnrollment.EStatus.DENIED);
        log.info(Constants.CONTEST_DELETED_SUCCESSFULLY);
        return ResponseEntity.ok(Constants.CONTEST_DELETED_SUCCESSFULLY);
    }

    @GetMapping("/get-enrollments/{contestId}")
    public ResponseEntity<List<ContestEnrollmentDTO>> getContests(
            @PathVariable("contestId") Long contestId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        List<ContestEnrollmentDTO> contestDTOs = contestEnrollmentService
                .getEnrollments(contestId, page, size);
        log.info(Constants.CONTEST_ENROLLMENTS_RETRIEVED_SUCCESSFULLY);
        return ResponseEntity.ok(contestDTOs);
    }
}
