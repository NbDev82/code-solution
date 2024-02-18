package com.university.codesolution.contest.service;

import com.university.codesolution.contest.dto.ContestEnrollmentDTO;
import com.university.codesolution.contest.entity.ContestEnrollment;
import com.university.codesolution.contest.request.AddEnrollmentRequest;
import com.university.codesolution.contest.request.UpdateEnrollmentRequest;

import java.util.List;

public interface ContestEnrollmentService {
     ContestEnrollmentDTO add(AddEnrollmentRequest request);
     ContestEnrollmentDTO update(UpdateEnrollmentRequest updateRequest);
     ContestEnrollmentDTO updateStatus(Long contestEnrollmentId, ContestEnrollment.EStatus eStatus);
     List<ContestEnrollmentDTO> getEnrollments(Long contestId, int page, int size);
     ContestEnrollmentDTO getById(Long contestEnrollmentId);
}
