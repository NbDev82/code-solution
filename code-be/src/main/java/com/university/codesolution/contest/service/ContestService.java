package com.university.codesolution.contest.service;

import com.university.codesolution.contest.dto.ContestDTO;
import com.university.codesolution.contest.entity.Contest;
import com.university.codesolution.contest.request.AddContestRequest;
import com.university.codesolution.contest.request.UpdateContestRequest;

import java.util.List;

public interface ContestService {
    ContestDTO add(AddContestRequest addRequest);
    ContestDTO update(UpdateContestRequest updateRequest);
    ContestDTO updateStatus(Long contestId, Contest.EStatus status);
    List<ContestDTO> getContests(Long userId, int page, int size);
    ContestDTO getById(Long contestId);
}
