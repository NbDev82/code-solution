package com.university.codesolution.login.service;

import com.university.codesolution.login.customenum.ERole;
import com.university.codesolution.login.dto.UserDTO;
import com.university.codesolution.login.entity.User;

public interface UserService {
    UserDTO createUser(UserDTO userDTO);
    String login(String phoneNumber, String password, ERole eRole) throws Exception;
    User getUserDetailsFromToken(String token )throws Exception;
    UserDTO getUserById(Long userId);
}
