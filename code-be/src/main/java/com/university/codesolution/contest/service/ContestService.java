package com.university.codesolution.contest.service;

import com.university.codesolution.contest.dto.ContestDTO;
import com.university.codesolution.contest.entity.Contest;
import com.university.codesolution.contest.request.AddContestRequest;
import com.university.codesolution.contest.request.GetContestsRequest;
import com.university.codesolution.contest.request.GetContestsRequestByTitle;
import com.university.codesolution.contest.request.UpdateContestRequest;

import java.util.List;

public interface ContestService {
    ContestDTO add(AddContestRequest addRequest);
    ContestDTO update(UpdateContestRequest updateRequest);
    List<ContestDTO> getContests(GetContestsRequest getRequest);
    List<ContestDTO> getGlobalContests(GetContestsRequest getRequest);
    ContestDTO getById(Long contestId);
    void markContestAsDeleted(Long contestId);
    List<ContestDTO> getMyContestsByTitle(GetContestsRequestByTitle getRequest);
}
