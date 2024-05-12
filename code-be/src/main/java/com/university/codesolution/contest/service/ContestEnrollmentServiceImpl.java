package com.university.codesolution.contest.service;

import com.university.codesolution.common.service.EmailService;
import com.university.codesolution.contest.dto.ContestDTO;
import com.university.codesolution.contest.dto.ContestEnrollmentDTO;
import com.university.codesolution.contest.entity.Contest;
import com.university.codesolution.contest.entity.ContestEnrollment;
import com.university.codesolution.contest.exeption.ContestEnrollmentNotFoundException;
import com.university.codesolution.contest.mapper.ContestEnrollmentMapper;
import com.university.codesolution.contest.repos.ContestEnrollmentRepos;
import com.university.codesolution.contest.request.AddEnrollmentRequest;
import com.university.codesolution.contest.request.GetEnrollmentsRequest;
import com.university.codesolution.contest.request.UpdateEnrollmentRequest;
import com.university.codesolution.login.dto.UserDTO;
import com.university.codesolution.login.entity.User;
import com.university.codesolution.login.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
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
    private final EmailService emailService;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Override
    public ContestEnrollmentDTO add(AddEnrollmentRequest request) {
        Contest contest = contestService.getEntityById(request.contestId());
        User user = userService.getEntityUserById(request.userId());

        ContestEnrollment savedEnrollment = saveContestEnrollment(request, contest, user);
        sendInvitationEmail(user, contest, savedEnrollment);
        return ceMapper.toDTO(savedEnrollment);
    }

    @Override
    public ContestEnrollmentDTO update(UpdateEnrollmentRequest updateRequest) {
        ContestEnrollmentDTO contestEnrollmentDTO = getById( updateRequest.enrollmentId() );

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
    public List<ContestEnrollmentDTO> getEnrollments(GetEnrollmentsRequest getRequest) {
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

    @Override
    public ContestEnrollmentDTO getEnrollment(Long contestId, Long userId) {
        String msg = String.format("Could not find any contest with contestId=%s and userId=%s", contestId, userId);
        ContestEnrollment enrollment = contestEnrollmentRepos.findByContestIdAndUserId(contestId, userId)
                .orElseThrow(() -> new ContestEnrollmentNotFoundException(msg));
        return ceMapper.toDTO(enrollment);
    }

    private ContestEnrollmentDTO save(ContestEnrollmentDTO contestEnrollmentDTO) {
        ContestEnrollment contestEnrollment = ceMapper.toEntity(contestEnrollmentDTO);
        ContestEnrollment saved = contestEnrollmentRepos.save(contestEnrollment);
        return ceMapper.toDTO(saved);
    }

    private ContestEnrollment saveContestEnrollment(AddEnrollmentRequest request, Contest contest, User user) {
        ContestEnrollment contestEnrollment = ContestEnrollment.builder()
                .score(request.score())
                .acceptedSubmission(request.acceptedSubmission())
                .contest(contest)
                .user(user)
                .build();

        return contestEnrollmentRepos.save(contestEnrollment);
    }

    private void sendInvitationEmail(User user, Contest contest, ContestEnrollment savedEnrollment) {
        String subject = "Invitation to Participate in " + contest.getTitle();
        String confirmationLink = frontendUrl + "/contest-invitation?enrollmentId=" + savedEnrollment.getId();
        String invitationEmailContent = String.format("<p>Dear %s,</p>" +
                        "<p>We are excited to invite you to participate in the upcoming %s!</p>" +
                        "<p>Contest Details:</p>" +
                        "<ul>" +
                        "<li>Contest Name: %s</li>" +
                        "<li>Duration: %d</li>" +
                        "</ul>" +
                        "<p>Please confirm your participation by clicking the link below:</p>" +
                        "<p><a href=\"%s\">Confirm Participation</a></p>" +
                        "<p>We look forward to your enthusiastic participation and wish you the best of luck in the contest!</p>" +
                        "<p>Best regards</p>",
                user.getFullName(), contest.getTitle(), contest.getTitle(), contest.getDurationInMillis(), confirmationLink);

        emailService.sendHtmlContent(user.getEmail(), subject, invitationEmailContent);
    }
}
