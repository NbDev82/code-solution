package com.university.codesolution.contest.mapper;

import com.university.codesolution.contest.dto.ContestDTO;
import com.university.codesolution.contest.dto.ContestEnrollmentDTO;
import com.university.codesolution.contest.entity.Contest;
import com.university.codesolution.contest.entity.ContestEnrollment;
import com.university.codesolution.login.dto.UserDTO;
import com.university.codesolution.login.entity.User;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ContestEnrollmentMapperTest {
    private final ContestEnrollmentMapper mapper = ContestEnrollmentMapper.INSTANCE;

    @Test
    public void testToEntity() {
        // Given
        ContestEnrollmentDTO dto = new ContestEnrollmentDTO();
        dto.setId(1L);
        dto.setScore(90.5);
        dto.setAcceptedSubmission(true);
        dto.setStatus(ContestEnrollment.EStatus.PENDING_APPROVAL);
        dto.setContestId(100L);
        dto.setUserId(200L);

        ContestDTO contestDTO = new ContestDTO();
        contestDTO.setId(100L);
        dto.setContest(contestDTO);

        UserDTO userDTO = new UserDTO();
        userDTO.setId(200L);
        dto.setUser(userDTO);

        // When
        ContestEnrollment entity = mapper.toEntity(dto);

        // Then
        assertNotNull(entity);
        assertEquals(dto.getId(), entity.getId());
        assertEquals(dto.getScore(), entity.getScore());
        assertEquals(dto.isAcceptedSubmission(), entity.isAcceptedSubmission());
        assertEquals(dto.getStatus(), entity.getStatus());
        assertEquals(dto.getContestId(), entity.getContest().getId());
        assertEquals(dto.getUserId(), entity.getUser().getId());
    }

    @Test
    public void testToDTO() {
        // Given
        ContestEnrollment entity = new ContestEnrollment();
        entity.setId(1L);
        entity.setScore(90.5);
        entity.setAcceptedSubmission(true);
        entity.setStatus(ContestEnrollment.EStatus.PENDING_APPROVAL);

        Contest contest = new Contest();
        contest.setId(100L);
        entity.setContest(contest);

        User user = new User();
        user.setId(200L);
        entity.setUser(user);

        // When
        ContestEnrollmentDTO dto = mapper.toDTO(entity);

        // Then
        assertNotNull(dto);
        assertEquals(entity.getId(), dto.getId());
        assertEquals(entity.getScore(), dto.getScore());
        assertEquals(entity.isAcceptedSubmission(), dto.isAcceptedSubmission());
        assertEquals(entity.getStatus(), dto.getStatus());
        assertEquals(entity.getContest().getId(), dto.getContestId());
        assertEquals(entity.getUser().getId(), dto.getUserId());
    }
}