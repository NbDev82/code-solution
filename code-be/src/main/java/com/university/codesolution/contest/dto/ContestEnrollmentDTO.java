package com.university.codesolution.contest.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.university.codesolution.contest.entity.ContestEnrollment;
import com.university.codesolution.login.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ContestEnrollmentDTO {
    private Long id;
    private double score;
    private boolean acceptedSubmission;
    private ContestEnrollment.EStatus status;
    private Long contestId;
    private Long userId;

    @JsonIgnore
    private ContestDTO contest;

    @JsonIgnore
    private UserDTO user;
}

