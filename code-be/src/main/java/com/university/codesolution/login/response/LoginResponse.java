package com.university.codesolution.login.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.university.codesolution.login.dto.UserDTO;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginResponse {
    @JsonProperty("token")
    private String token;
    @JsonProperty("message")
    private String message;

    @JsonProperty("user")
    private UserDTO user;
}
