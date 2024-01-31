package com.university.codesolution.login.service;

import com.university.codesolution.login.dto.UserDTO;

public interface UserService {
    UserDTO createUser(UserDTO userDTO);
    UserDTO getUserById(Long userId);
}
