package com.university.codesolution.contest.service;

import com.university.codesolution.contest.dto.ContestDTO;
import com.university.codesolution.contest.entity.Contest;
import com.university.codesolution.contest.entity.ContestEnrollment;
import com.university.codesolution.contest.exeption.ContestNotFoundException;
import com.university.codesolution.contest.mapper.ContestMapper;
import com.university.codesolution.contest.repos.ContestEnrollmentRepos;
import com.university.codesolution.contest.repos.ContestRepos;
import com.university.codesolution.contest.request.AddContestRequest;
import com.university.codesolution.contest.request.GetContestsRequest;
import com.university.codesolution.contest.request.GetContestsRequestByTitle;
import com.university.codesolution.contest.request.UpdateContestRequest;
import com.university.codesolution.login.entity.User;
import com.university.codesolution.login.service.UserService;
import com.university.codesolution.submitcode.DTO.ProblemDTO;
import com.university.codesolution.submitcode.problem.entity.Problem;
import com.university.codesolution.submitcode.problem.mapper.ProblemMapper;
import com.university.codesolution.submitcode.problem.service.ProblemService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ContestServiceImpl implements ContestService {

    private final ContestMapper cMapper = ContestMapper.INSTANCE;
    private final ProblemMapper pMapper = ProblemMapper.INSTANCE;

    private final ContestRepos contestRepos;
    private final UserService userService;
    private final ProblemService problemService;
    private final ContestEnrollmentRepos enrollmentRepos;

    @Override
    public ContestDTO addContestWithProblemsAndParticipants(AddContestRequest addRequest) {
        User owner = userService.getEntityUserById( addRequest.ownerId() );

        Contest contest = Contest.builder()
                .title( addRequest.title() )
                .desc( addRequest.desc() )
                .durationInMillis(addRequest.durationInMillis())
                .owner(owner)
                .build();

        List<Problem> problems = new ArrayList<>();
        for (Long problemId : addRequest.problemIds()) {
            Problem problem = problemService.getEntityByProblemId(problemId);
            problems.add(problem);
        }
        contest.setProblems(problems);

        try {
            Contest savedContest = contestRepos.save(contest);


            for (Long participantId : addRequest.participantIds()) {
                User user = userService.getEntityUserById(participantId);
                ContestEnrollment enrollment = ContestEnrollment.builder()
                        .score(0)
                        .acceptedSubmission(false)
                        .status(ContestEnrollment.EStatus.ACCEPTED)
                        .contest(savedContest)
                        .user(user)
                        .build();
                enrollmentRepos.save(enrollment);
            }


            return cMapper.toDTO(savedContest);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public ContestDTO update(UpdateContestRequest updateRequest) {
        Contest contest = getEntityById( updateRequest.id() );

        contest.setTitle( updateRequest.title() );
        contest.setDesc( updateRequest.desc() );
        contest.setDurationInMillis( updateRequest.durationInMillis() );

        return save(contest);
    }

    @Override
    public List<ContestDTO> getMyContests(GetContestsRequest getRequest) {
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

    @Override
    public List<ProblemDTO> getProblemsByContest(Long contestId) {
        return pMapper.toDTOs(contestRepos.getProblemsByContest(contestId));
    }

    @Override
    public Contest getEntityById(Long contestId) {
        String msg = "Could not find any contest with id=" + contestId;
        return contestRepos.findById(contestId)
                .orElseThrow(() -> new ContestNotFoundException(msg));
    }

    private ContestDTO save(Contest contest) {
        Contest saved = contestRepos.save(contest);
        return cMapper.toDTO(saved);
    }

    private ContestDTO save(ContestDTO contestDTO) {
        Contest contest = cMapper.toEntity(contestDTO);
        return save(contest);
    }
}
