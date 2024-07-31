package com.university.codesolution.contest.service;

import com.university.codesolution.contest.dto.ContestEnrollmentDTO;
import com.university.codesolution.contest.entity.ContestEnrollment;
import com.university.codesolution.contest.request.AddEnrollmentRequest;
import com.university.codesolution.contest.request.GetEnrollmentsRequest;
import com.university.codesolution.contest.request.UpdateEnrollmentRequest;
import com.university.codesolution.login.dto.UserDTO;

import java.util.List;

public interface ContestEnrollmentService {
    ContestEnrollmentDTO add(AddEnrollmentRequest request);

    ContestEnrollmentDTO update(UpdateEnrollmentRequest updateRequest);

    ContestEnrollmentDTO updateStatus(Long contestEnrollmentId, ContestEnrollment.EStatus eStatus);

    List<ContestEnrollmentDTO> getEnrollments(GetEnrollmentsRequest getRequest);

    ContestEnrollmentDTO getById(Long contestEnrollmentId);

    ContestEnrollmentDTO getEnrollment(Long contestId, Long userId);

    List<UserDTO> getParticipantsByContest(Long contestId);

    List<UserDTO> getUsersToInviteByName(Long contestId, String nameToSearch, int page, int size);

    ContestEnrollmentDTO inviteUser(Long contestId, Long userId);
}
