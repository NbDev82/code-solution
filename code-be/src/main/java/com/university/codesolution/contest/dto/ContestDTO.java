package com.university.codesolution.contest.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.university.codesolution.login.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ContestDTO {
    private Long id;
    private String title;
    private String desc;
    private long durationInMillis;
    private Long ownerId;

    @JsonIgnore
    private UserDTO owner;
}