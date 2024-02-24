package com.university.codesolution.login.mapper;

import com.university.codesolution.login.customenum.ERole;
import com.university.codesolution.login.dto.UserDTO;
import com.university.codesolution.login.entity.User;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class UserMapperTest {
    private final UserMapper userMapper = UserMapper.INSTANCE;

    @Test
    public void testToDTO() {
        // Create a mock User entity
        User user = User.builder()
                .id(1L)
                .fullName("John Doe")
                .phoneNumber("123456789")
                .dateOfBirth(LocalDateTime.of(1990, 1, 1, 0, 0))
                .email("john.doe@example.com")
                .password("password")
                .cumulativeScore(100.0)
                .addedAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .isActive(true)
                .role(ERole.USER)
                .build();

        // Map the User entity to UserDTO
        UserDTO userDTO = userMapper.toDTO(user);

        // Assert the mapping
        assertEquals(user.getId(), userDTO.getId());
        assertEquals(user.getFullName(), userDTO.getFullName());
        assertEquals(user.getPhoneNumber(), userDTO.getPhoneNumber());
        assertEquals(user.getDateOfBirth(), userDTO.getDateOfBirth());
        assertEquals(user.getEmail(), userDTO.getEmail());
        assertEquals(user.getPassword(), userDTO.getPassword());
        assertEquals(user.getCumulativeScore(), userDTO.getCumulativeScore());
        assertEquals(user.getAddedAt(), userDTO.getAddedAt());
        assertEquals(user.getUpdatedAt(), userDTO.getUpdatedAt());
        assertEquals(user.getRole(), userDTO.getRole());
    }

    @Test
    public void testToDTOs() {
        // Create a list of mock User entities
        List<User> users = new ArrayList<>();
        users.add(User.builder()
                .id(1L)
                .fullName("John Doe")
                .phoneNumber("123456789")
                .dateOfBirth(LocalDateTime.of(1990, 1, 1, 0, 0))
                .email("john.doe@example.com")
                .password("password")
                .cumulativeScore(100.0)
                .addedAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .isActive(true)
                .role(ERole.USER)
                .build());

        // Map the list of User entities to a list of UserDTOs
        List<UserDTO> userDTOs = userMapper.toDTOs(users);

        // Assert the mapping
        assertEquals(users.size(), userDTOs.size());
        for (int i = 0; i < users.size(); i++) {
            User user = users.get(i);
            UserDTO userDTO = userDTOs.get(i);
            assertEquals(user.getId(), userDTO.getId());
            assertEquals(user.getFullName(), userDTO.getFullName());
            assertEquals(user.getPhoneNumber(), userDTO.getPhoneNumber());
            assertEquals(user.getDateOfBirth(), userDTO.getDateOfBirth());
            assertEquals(user.getEmail(), userDTO.getEmail());
            assertEquals(user.getPassword(), userDTO.getPassword());
            assertEquals(user.getCumulativeScore(), userDTO.getCumulativeScore());
            assertEquals(user.getAddedAt(), userDTO.getAddedAt());
            assertEquals(user.getUpdatedAt(), userDTO.getUpdatedAt());
            assertEquals(user.getRole(), userDTO.getRole());
        }
    }

    @Test
    public void testToEntity() {
        // Create a mock UserDTO
        UserDTO userDTO = UserDTO.builder()
                .id(1L)
                .fullName("John Doe")
                .phoneNumber("123456789")
                .dateOfBirth(LocalDateTime.of(1990, 1, 1, 0, 0))
                .email("john.doe@example.com")
                .password("password")
                .cumulativeScore(100.0)
                .addedAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .role(ERole.USER)
                .build();

        // Map the UserDTO to User entity
        User user = userMapper.toEntity(userDTO);

        // Assert the mapping
        assertEquals(userDTO.getId(), user.getId());
        assertEquals(userDTO.getFullName(), user.getFullName());
        assertEquals(userDTO.getPhoneNumber(), user.getPhoneNumber());
        assertEquals(userDTO.getDateOfBirth(), user.getDateOfBirth());
        assertEquals(userDTO.getEmail(), user.getEmail());
        assertEquals(userDTO.getPassword(), user.getPassword());
        assertEquals(userDTO.getCumulativeScore(), user.getCumulativeScore());
        assertEquals(userDTO.getAddedAt(), user.getAddedAt());
        assertEquals(userDTO.getUpdatedAt(), user.getUpdatedAt());
        assertEquals(userDTO.getRole(), user.getRole());
    }

    @Test
    public void testToEntities() {
        // Create a list of mock UserDTOs
        List<UserDTO> userDTOs = new ArrayList<>();
        userDTOs.add(UserDTO.builder()
                .id(1L)
                .fullName("John Doe")
                .phoneNumber("123456789")
                .dateOfBirth(LocalDateTime.of(1990, 1, 1, 0, 0))
                .email("john.doe@example.com")
                .password("password")
                .cumulativeScore(100.0)
                .addedAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .role(ERole.USER)
                .build());

        // Map the list of UserDTOs to a list of User entities
        List<User> users = userMapper.toEntities(userDTOs);

        // Assert the mapping
        assertEquals(userDTOs.size(), users.size());
        for (int i = 0; i < userDTOs.size(); i++) {
            UserDTO userDTO = userDTOs.get(i);
            User user = users.get(i);
            assertEquals(userDTO.getId(), user.getId());
            assertEquals(userDTO.getFullName(), user.getFullName());
            assertEquals(userDTO.getPhoneNumber(), user.getPhoneNumber());
            assertEquals(userDTO.getDateOfBirth(), user.getDateOfBirth());
            assertEquals(userDTO.getEmail(), user.getEmail());
            assertEquals(userDTO.getPassword(), user.getPassword());
            assertEquals(userDTO.getCumulativeScore(), user.getCumulativeScore());
            assertEquals(userDTO.getAddedAt(), user.getAddedAt());
            assertEquals(userDTO.getUpdatedAt(), user.getUpdatedAt());
            assertEquals(userDTO.getRole(), user.getRole());
        }
    }
}