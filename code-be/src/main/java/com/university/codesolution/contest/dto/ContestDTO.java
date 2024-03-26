package com.university.codesolution.contest.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.university.codesolution.contest.entity.Contest;
import com.university.codesolution.login.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ContestDTO {
    private Long id;
    private String title;
    private String desc;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private long durationInMillis;
    private Contest.EStatus status;
    private Long ownerId;

    @JsonIgnore
    private UserDTO owner;
}