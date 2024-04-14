package com.university.codesolution.search.service;

import com.university.codesolution.search.dto.ProblemDTO;
import com.university.codesolution.search.dto.SearchResultDTO;
import com.university.codesolution.search.enums.EStatus;
import com.university.codesolution.search.exception.SearchProblemException;
import com.university.codesolution.search.mapper.SearchProblemMapper;
import com.university.codesolution.search.requestmodel.SearchRequest;
import com.university.codesolution.submitcode.problem.entity.Problem;
import com.university.codesolution.submitcode.problem.repository.ProblemRepository;
import com.university.codesolution.submitcode.submission.entity.Submission;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SearchServiceImpl implements SearchService{
    private static final Logger log = LogManager.getLogger(SearchServiceImpl.class);

    private final SearchProblemMapper mapper;

    private final ProblemRepository problemRepos;

    public SearchServiceImpl(SearchProblemMapper mapper, ProblemRepository problemRepos) {
        this.mapper = mapper;
        this.problemRepos = problemRepos;
    }

    @Override
    public SearchResultDTO getProblems(SearchRequest request) {
        try {
            String ALL_TERM = "all";

            Problem.EDifficultyLevel difficulty = parseEnum(request.getDifficulty(), ALL_TERM, Problem.EDifficultyLevel.class);
            Problem.ETopic topic = parseEnum(request.getTopic(), ALL_TERM, Problem.ETopic.class);

            EStatus status = parseEnum(request.getStatus(), ALL_TERM, EStatus.class);

            String searchTerm = request.getSearchTerm();

            Pageable sortedById = PageRequest.of(request.getPageNumber(), request.getLimit(), Sort.by("id"));

            Page<Problem> problemPage = problemRepos.findByCriteria(difficulty, sortedById);

            List<ProblemDTO> problemDTOs = new ArrayList<>(problemPage.stream().toList().stream()
                    .filter(problem -> topic == null || problem.getTopics().contains(topic))
                    .filter(problem -> searchTerm.isEmpty() || problem.getName().contains(searchTerm))
                    .map(problem -> enrichProblemDTO(problem, request.getUserId()))
                    .filter(problemDTO -> status == null || problemDTO.getStatus().equals(status))
                    .toList());

            return new SearchResultDTO(
                    problemPage.getTotalPages(),
                    problemPage.getTotalElements(),
                    problemDTOs);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new SearchProblemException(e.getMessage());
        }
    }

    private <T extends Enum<T>> T parseEnum(String value, String allTerm, Class<T> enumClass) {
        return value.equalsIgnoreCase(allTerm) ? null : Enum.valueOf(enumClass, value.toUpperCase());
    }

    private ProblemDTO enrichProblemDTO(Problem problem, Long userId) {
        ProblemDTO problemDTO = mapper.toDTO(problem,userId);

        long attemptedCount = problem.getSubmissions()
                .stream()
                .filter(submission -> submission.getUser().getId().equals(userId))
                .count();

        long acceptedCount = problem.getSubmissions()
                .stream()
                .filter(submission -> submission.getUser().getId().equals(userId)
                        && submission.getStatus().equals(Submission.EStatus.ACCEPTED))
                .count();

        problemDTO.setStatus(calculateUserStatus(attemptedCount, acceptedCount));

        return problemDTO;
    }

    private EStatus calculateUserStatus(long attemptedCount, long acceptedCount) {
        if (attemptedCount <= 0) {
            return EStatus.TODO;
        } else if (acceptedCount > 0) {
            return EStatus.SOLVED;
        } else {
            return EStatus.ATTEMPTED;
        }
    }
}
