package com.university.codesolution.login.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.university.codesolution.login.dto.UserDTO;
import com.university.codesolution.login.dto.UserLoginDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
    @JsonProperty("token")
    private String token;

    @JsonProperty("user")
    private UserDTO user;
}
