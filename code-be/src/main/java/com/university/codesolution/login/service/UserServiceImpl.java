package com.university.codesolution.login.service;

import com.university.codesolution.login.customenum.ERole;
import com.university.codesolution.login.dto.UserDTO;
import com.university.codesolution.login.entity.User;
import com.university.codesolution.login.exception.PermissionDenyException;
import com.university.codesolution.login.exception.UserNotFoundException;
import com.university.codesolution.login.mapper.UserMapper;
import com.university.codesolution.login.repository.UserRepos;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserMapper uMapper = UserMapper.INSTANCE;
    private final UserRepos userRepos;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        String phoneNumber = userDTO.getPhoneNumber();

        if (userRepos.existsByPhoneNumber(phoneNumber)) {
            throw new DataIntegrityViolationException("Phone number already exits");
        }
        ERole eRole = userDTO.getRole();
        if (ERole.ADMIN.equals(eRole)) {
            throw new PermissionDenyException("Registering an Admin account is not allowed");
        }
        User user = uMapper.toEntity(userDTO);
        String password = userDTO.getPassword();
        String encodedPassword = passwordEncoder.encode(password);
        user.setPassword(encodedPassword);

        User saved = userRepos.save(user);
        return uMapper.toDTO(saved);
    }

    @Override
    public UserDTO getUserById(Long userId) {
        User user = userRepos.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Could not find any user with id=" + userId));
        return uMapper.toDTO(user);
    }
}

