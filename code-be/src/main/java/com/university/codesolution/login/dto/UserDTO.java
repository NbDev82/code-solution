package com.university.codesolution.login.dto;

import com.university.codesolution.login.customenum.ERole;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class UserDTO {
    private Long id;

    private String fullName;

    @NotBlank(message = "Phone number is required")
    private String phoneNumber;

    private LocalDateTime dateOfBirth;

    private String email;

    @NotBlank(message = "Password can not be blank")
    private String password;

    private double cumulativeScore;

    private LocalDateTime addedAt;

    private LocalDateTime updatedAt;

    @NotNull(message = "Role ID is required")
    private ERole role;
}
