package com.university.codesolution.login.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.university.codesolution.login.customenum.ERole;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserLoginDTO {
    @NotBlank(message = "Phone number is required")
    private String phoneNumber;
    @NotBlank(message = "Password can not be blank")
    private String password;
    @Min(value=1,message="You must enter role's Id")
    private ERole role;

}
