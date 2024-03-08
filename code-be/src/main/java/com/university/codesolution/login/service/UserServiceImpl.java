package com.university.codesolution.login.service;

import com.university.codesolution.login.component.JwtTokenUtils;
import com.university.codesolution.login.customenum.ERole;
import com.university.codesolution.login.dto.UserDTO;
import com.university.codesolution.login.entity.User;
import com.university.codesolution.login.exception.PermissionDenyException;
import com.university.codesolution.login.exception.UserNotFoundException;
import com.university.codesolution.login.mapper.UserMapper;
import com.university.codesolution.login.repository.UserRepos;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService  {

    private final UserMapper uMapper = UserMapper.INSTANCE;
    private final UserRepos userRepos;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtils jwtTokenUtil;

    @Override
    public UserDTO createUser(UserDTO userDTO)  {
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

    @Transactional
    @Override
    public User updateUser(UserDTO userDTO, Long userId) {
        User existingUser = userRepos.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Could not find any user with id=" + userId));
        String newPhoneNumber = userDTO.getPhoneNumber();
        if (!existingUser.getPhoneNumber().equals(newPhoneNumber) && userRepos.existsByPhoneNumber(newPhoneNumber)) {
            throw new DataIntegrityViolationException("Phone number already exists");
        }
        if (userDTO.getFullName() != null) {
            existingUser.setFullName(userDTO.getFullName());
        }
        if (userDTO.getPhoneNumber() != null) {
            existingUser.setPhoneNumber(userDTO.getPhoneNumber());
        }
        if (userDTO.getPassword() != null
                && !userDTO.getPassword().isEmpty())
        {

            String newPassword = userDTO.getPassword();
            String encodedPassword = passwordEncoder.encode(newPassword);
            existingUser.setPassword(encodedPassword);
        }
        return userRepos.save(existingUser);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return null;
    }

    @Override
    public void deleteUser(int userId) {

    }

    @Override
    public String login(String phoneNumber,String password,ERole eRole) throws Exception{
        Optional<User> optionalUser=userRepos.findByPhoneNumber(phoneNumber);
        User existingUse=optionalUser.get();
        UsernamePasswordAuthenticationToken authenticationToken=new UsernamePasswordAuthenticationToken(
                phoneNumber,password,existingUse.getAuthorities()
        );
//        authenticationManager.authenticate(authenticationToken);
        return jwtTokenUtil.generateToken(existingUse);
    }
    @Override
    public User getUserDetailsFromToken(String token) throws Exception{
        if(jwtTokenUtil.isTokenExpired(token)){
            throw new Exception("Token is expired");
        }
        String phoneNumber= jwtTokenUtil.extractPhoneNumber(token);
        Optional<User> user=userRepos.findByPhoneNumber(phoneNumber);
        if(user.isPresent()){
            return user.get();
        }else{
            throw new Exception("User not found");
        }

    }
}

