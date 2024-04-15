package com.university.codesolution.contest.service;

import com.university.codesolution.contest.dto.ContestDTO;
import com.university.codesolution.contest.entity.Contest;
import com.university.codesolution.contest.exeption.ContestNotFoundException;
import com.university.codesolution.contest.mapper.ContestMapper;
import com.university.codesolution.contest.repos.ContestRepos;
import com.university.codesolution.contest.request.AddContestRequest;
import com.university.codesolution.contest.request.GetContestsRequest;
import com.university.codesolution.contest.request.GetContestsRequestByTitle;
import com.university.codesolution.contest.request.UpdateContestRequest;
import com.university.codesolution.login.dto.UserDTO;
import com.university.codesolution.login.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContestServiceImpl implements ContestService {

    private final ContestMapper cMapper = ContestMapper.INSTANCE;
    private final ContestRepos contestRepos;
    private final UserService userService;

    @Override
    public ContestDTO add(AddContestRequest addRequest) {
        UserDTO userDTO = userService.getUserById( addRequest.ownerId() );

        ContestDTO contestDTO = ContestDTO.builder()
                .title( addRequest.title() )
                .desc( addRequest.desc() )
                .durationInMillis(addRequest.durationInMillis())
                .owner(userDTO)
                .build();
        return save(contestDTO);
    }

    @Override
    public ContestDTO update(UpdateContestRequest updateRequest) {
        ContestDTO contestDTO = getById( updateRequest.id() );

        contestDTO.setTitle( updateRequest.title() );
        contestDTO.setDesc( updateRequest.desc() );

        return save(contestDTO);
    }

    @Override
    public List<ContestDTO> getContests(GetContestsRequest getRequest) {
        Pageable pageable = PageRequest.of(getRequest.page(), getRequest.size());
        List<Contest> contests = contestRepos.getByOwnerId(getRequest.userId(), pageable);
        return cMapper.toDTOs(contests);
    }

    @Override
    public List<ContestDTO> getGlobalContests(GetContestsRequest getRequest) {
        Pageable pageable = PageRequest.of(getRequest.page(), getRequest.size());
        List<Contest> contests = contestRepos.getGlobalContests(getRequest.userId(), pageable);
        return cMapper.toDTOs(contests);
    }

    @Override
    public ContestDTO getById(Long contestId) {
        Contest contest = getEntityById(contestId);
        return cMapper.toDTO(contest);
    }

    @Override
    public void markContestAsDeleted(Long contestId) {
        Contest contest = getEntityById(contestId);
        contest.setDeleted(true);
        save(contest);
    }

    @Override
    public List<ContestDTO> getMyContestsByTitle(GetContestsRequestByTitle getRequest) {
        Pageable pageable = PageRequest.of(getRequest.page(), getRequest.size());
        List<Contest> contests = contestRepos.getMyContestsByTitle(getRequest.userId(), getRequest.title(), pageable);
        return cMapper.toDTOs(contests);
    }

    private ContestDTO save(Contest contest) {
        Contest saved = contestRepos.save(contest);
        return cMapper.toDTO(saved);
    }

    private ContestDTO save(ContestDTO contestDTO) {
        Contest contest = cMapper.toEntity(contestDTO);
        return save(contest);
    }

    private Contest getEntityById(Long contestId) {
        String msg = "Could not find any contest with id=" + contestId;
        return contestRepos.findById(contestId)
                .orElseThrow(() -> new ContestNotFoundException(msg));
    }
}
