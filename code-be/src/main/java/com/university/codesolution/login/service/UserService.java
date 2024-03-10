package com.university.codesolution.login.service;

import com.university.codesolution.login.customenum.ERole;
import com.university.codesolution.login.dto.UserDTO;
import com.university.codesolution.login.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface UserService {
    UserDTO createUser(UserDTO userDTO);
    String login(String phoneNumber, String password, ERole eRole) throws Exception;
    User getUserDetailsFromToken(String token )throws Exception;
    UserDTO getUserById(Long userId);
    User updateUser(UserDTO userDTO, Long userId);
    List<UserDTO> getAllUsers();
    void deleteUser(int userId);
}
