package com.university.codesolution.contest.mapper;

import com.university.codesolution.contest.dto.ContestDTO;
import com.university.codesolution.contest.entity.Contest;
import com.university.codesolution.login.customenum.ERole;
import com.university.codesolution.login.dto.UserDTO;
import com.university.codesolution.login.entity.User;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class ContestMapperTest {
    private final ContestMapper mapper = Mappers.getMapper(ContestMapper.class);

    @Test
    public void testToDTO() {
        // Create a mock Contest entity
        Contest contest = Contest.builder()
                .id(1L)
                .title("Sample Contest")
                .desc("Sample description")
                .owner(User.builder().id(10L).build())
                .build();

        // Map the Contest entity to ContestDTO
        ContestDTO contestDTO = mapper.toDTO(contest);

        // Assert the mapping
        assertEquals(contest.getId(), contestDTO.getId());
        assertEquals(contest.getTitle(), contestDTO.getTitle());
        assertEquals(contest.getDesc(), contestDTO.getDesc());

        assertNotNull(contestDTO);
        assertEquals(contest.getOwner().getId(), contestDTO.getOwnerId());
        assertEquals(contest.getOwner().getId(), contestDTO.getOwner().getId());
        assertEquals(contest.getOwner().getFullName(), contestDTO.getOwner().getFullName());
        assertEquals(contest.getOwner().getPhoneNumber(), contestDTO.getOwner().getPhoneNumber());
        assertEquals(contest.getOwner().getDateOfBirth(), contestDTO.getOwner().getDateOfBirth());
        assertEquals(contest.getOwner().getEmail(), contestDTO.getOwner().getEmail());
        assertEquals(contest.getOwner().getPassword(), contestDTO.getOwner().getPassword());
        assertEquals(contest.getOwner().getCumulativeScore(), contestDTO.getOwner().getCumulativeScore());
        assertEquals(contest.getOwner().getAddedAt(), contestDTO.getOwner().getAddedAt());
        assertEquals(contest.getOwner().getUpdatedAt(), contestDTO.getOwner().getUpdatedAt());
    }

    @Test
    public void testToEntity() {
        // Create a mock ContestDTO
        UserDTO owner = UserDTO.builder()
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

        ContestDTO contestDTO = ContestDTO.builder()
                .id(1L)
                .title("Sample Contest")
                .desc("Sample description")
                .owner(owner)
                .build();

        // Map the ContestDTO to Contest entity
        Contest contest = mapper.toEntity(contestDTO);

        // Assert the mapping
        assertEquals(contestDTO.getId(), contest.getId());
        assertEquals(contestDTO.getTitle(), contest.getTitle());
        assertEquals(contestDTO.getDesc(), contest.getDesc());

        assertNotNull(contest.getOwner());
        assertEquals(contestDTO.getOwner().getId(), contest.getOwner().getId());
        assertEquals(contestDTO.getOwner().getFullName(), contest.getOwner().getFullName());
        assertEquals(contestDTO.getOwner().getPhoneNumber(), contest.getOwner().getPhoneNumber());
        assertEquals(contestDTO.getOwner().getDateOfBirth(), contest.getOwner().getDateOfBirth());
        assertEquals(contestDTO.getOwner().getEmail(), contest.getOwner().getEmail());
        assertEquals(contestDTO.getOwner().getPassword(), contest.getOwner().getPassword());
        assertEquals(contestDTO.getOwner().getCumulativeScore(), contest.getOwner().getCumulativeScore());
        assertEquals(contestDTO.getOwner().getAddedAt(), contest.getOwner().getAddedAt());
        assertEquals(contestDTO.getOwner().getUpdatedAt(), contest.getOwner().getUpdatedAt());
    }
}