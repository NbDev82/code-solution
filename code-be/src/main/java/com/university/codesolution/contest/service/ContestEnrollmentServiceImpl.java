package com.university.codesolution.contest.service;

import com.university.codesolution.contest.dto.ContestDTO;
import com.university.codesolution.contest.dto.ContestEnrollmentDTO;
import com.university.codesolution.contest.entity.Contest;
import com.university.codesolution.contest.entity.ContestEnrollment;
import com.university.codesolution.contest.exeption.ContestEnrollmentNotFoundException;
import com.university.codesolution.contest.mapper.ContestEnrollmentMapper;
import com.university.codesolution.contest.mapper.ContestMapper;
import com.university.codesolution.contest.repos.ContestEnrollmentRepos;
import com.university.codesolution.contest.request.AddEnrollmentRequest;
import com.university.codesolution.contest.request.GetEnrollmentRequest;
import com.university.codesolution.contest.request.UpdateEnrollmentRequest;
import com.university.codesolution.login.dto.UserDTO;
import com.university.codesolution.login.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContestEnrollmentServiceImpl implements ContestEnrollmentService {

    private final ContestEnrollmentMapper ceMapper = ContestEnrollmentMapper.INSTANCE;
    private final ContestEnrollmentRepos contestEnrollmentRepos;
    private final ContestService contestService;
    private final UserService userService;

    @Override
    public ContestEnrollmentDTO add(AddEnrollmentRequest request) {
        ContestDTO contestDTO = contestService.getById( request.contestId() );
        UserDTO userDTO = userService.getUserById( request.userId() );

        ContestEnrollmentDTO contestEnrollmentDTO = ContestEnrollmentDTO.builder()
                .score( request.score() )
                .acceptedSubmission( request.acceptedSubmission() )
                .contest(contestDTO)
                .user(userDTO)
                .build();
        return save(contestEnrollmentDTO);
    }

    @Override
    public ContestEnrollmentDTO update(UpdateEnrollmentRequest updateRequest) {
        ContestEnrollmentDTO contestEnrollmentDTO = getById( updateRequest.contestEnrollmentId() );

        contestEnrollmentDTO.setScore( updateRequest.score() );
        contestEnrollmentDTO.setAcceptedSubmission( updateRequest.acceptedSubmission() );
        contestEnrollmentDTO.setStatus( updateRequest.status() );

        return save(contestEnrollmentDTO);
    }

    @Override
    public ContestEnrollmentDTO updateStatus(Long contestEnrollmentId, ContestEnrollment.EStatus status) {
        ContestEnrollmentDTO contestEnrollmentDTO = getById( contestEnrollmentId );
        contestEnrollmentDTO.setStatus(status);

        return save(contestEnrollmentDTO);
    }

    @Override
    public List<ContestEnrollmentDTO> getEnrollments(GetEnrollmentRequest getRequest) {
        Pageable pageable = PageRequest.of(getRequest.page(), getRequest.size());
        List<ContestEnrollment> contestEnrollments = contestEnrollmentRepos
                .getByContestId(getRequest.contestId(), pageable);
        return ceMapper.toDTOs(contestEnrollments);
    }

    @Override
    public ContestEnrollmentDTO getById(Long contestEnrollmentId) {
        String msg = String.format("Could not find any contest with id=%s", contestEnrollmentId);
        ContestEnrollment contestEnrollment = contestEnrollmentRepos.findById(contestEnrollmentId)
                .orElseThrow(() -> new ContestEnrollmentNotFoundException(msg));
        return ceMapper.toDTO(contestEnrollment);
    }

    private ContestEnrollmentDTO save(ContestEnrollmentDTO contestEnrollmentDTO) {
        ContestEnrollment contestEnrollment = ceMapper.toEntity(contestEnrollmentDTO);
        ContestEnrollment saved = contestEnrollmentRepos.save(contestEnrollment);
        return ceMapper.toDTO(saved);
    }
}
