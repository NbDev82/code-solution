package com.university.codesolution.submitcode.problem.service;

import com.university.codesolution.login.entity.User;
import com.university.codesolution.login.service.UserService;
import com.university.codesolution.submitcode.DTO.AddProblemRequestDTO;
import com.university.codesolution.submitcode.DTO.AddTestCaseRequestDTO;
import com.university.codesolution.submitcode.DTO.InputDTO;
import com.university.codesolution.submitcode.exception.ProblemNotFoundException;
import com.university.codesolution.submitcode.library.entity.LibrariesSupport;
import com.university.codesolution.submitcode.library.repository.LibraryRepository;
import com.university.codesolution.submitcode.parameter.entity.Parameter;
import com.university.codesolution.submitcode.parameter.repository.ParameterRepository;
import com.university.codesolution.submitcode.problem.entity.Problem;
import com.university.codesolution.submitcode.problem.mapper.ProblemMapper;
import com.university.codesolution.submitcode.problem.repository.ProblemRepository;
import com.university.codesolution.submitcode.request.AddProblemRequest;
import com.university.codesolution.submitcode.testcase.entity.TestCase;
import com.university.codesolution.submitcode.testcase.repository.TestCaseRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProblemServiceImpl implements ProblemService{
    private static final Logger log = LogManager.getLogger(ProblemServiceImpl.class);

    private final ProblemRepository problemRepository;
    private final TestCaseRepository testCaseRepository;
    private final ParameterRepository parameterRepository;
    private final LibraryRepository libraryRepository;

    private final ProblemMapper mapper;

    private final UserService userService;

    @Autowired
    public ProblemServiceImpl(ProblemRepository problemRepository,
                              TestCaseRepository testCaseRepository, ParameterRepository parameterRepository, LibraryRepository libraryRepository, ProblemMapper mapper, UserService userService) {
        this.problemRepository = problemRepository;
        this.testCaseRepository = testCaseRepository;
        this.parameterRepository = parameterRepository;
        this.libraryRepository = libraryRepository;
        this.mapper = mapper;
        this.userService = userService;
    }

    @Override
    public <T> T findById(Long problemId, Class<T> returnType) {
        Problem problem = getEntityByProblemId(problemId);
        log.info("get problemDTO from ProblemServiceImpl");

        return returnType.equals(Problem.class)
                ? returnType.cast(problem)
                : returnType.cast(mapper.toDTO(problem));
    }

    @Override
    public List<Problem> getAll() {
        return problemRepository.findAll();
    }

    @Override
    public List<Problem> getProblemsByOwner(Long userId) {
        return problemRepository.getProblemsByOwner(userId);
    }

    @Override
    public List<Problem> getProblemsByOwnerAndName(Long userId, String problemName) {
        return problemRepository.getProblemsByOwnerAndName(userId, problemName);
    }

    @Override
    public Problem getEntityByProblemId(Long problemId) {
        log.info("get problem from ProblemServiceImpl");
        return problemRepository.findById(problemId)
                .orElseThrow(() -> new ProblemNotFoundException("Requested problem not found"));
    }

    @Override
    public Boolean add(AddProblemRequest request) {
        try{
            Problem problem = createProblemFromRequest(request.getProblem());
            createAndSaveTestCaseFromRequest(request, problem);
            createAndSaveLibraryFromRequest(request,problem);
            return problem != null;
        } catch (Exception e) {
            log.info(e.getMessage());
            return false;
        }
    }

    @Override
    public Boolean delete(Long problemId) {
        Problem problem = problemRepository.findById(problemId).orElseThrow(()->new ProblemNotFoundException("Can't find problem with id "+problemId));
        problem.setDeleted(true);
        return true;
    }

    private void createAndSaveLibraryFromRequest(AddProblemRequest request, Problem problem) {
        List<String> libraries = request.getLibraries();

        LibrariesSupport librariesSupport;

        for (String library : libraries) {
            librariesSupport = LibrariesSupport.builder()
                    .name(library)
                    .problem(problem)
                    .build();
            libraryRepository.save(librariesSupport);
        }
    }

    private void createAndSaveTestCaseFromRequest(AddProblemRequest request, Problem problem) {
        List<AddTestCaseRequestDTO> testcaseDTOs = request.getTestcases();

        TestCase testCase;
        TestCase.TestCaseBuilder testCaseBuilder = TestCase.builder();
        for (AddTestCaseRequestDTO dto : testcaseDTOs) {
            testCase = testCaseBuilder
                    .outputData(dto.getOutput())
                    .problem(problem)
                    .build();
            createAndSaveParameterFromRequest(testCase, dto.getInput());
            testCaseRepository.save(testCase);
        }
    }

    private Problem createProblemFromRequest(AddProblemRequestDTO problemDTO) {
        Problem.EDifficultyLevel difficulty = Problem.EDifficultyLevel.valueOf(problemDTO.getDifficulty());
        int point = getPointFromDifficulty(difficulty);
        User user = userService.getEntityUserById(problemDTO.getOwnerId());
        List<Problem.ETopic> topics = new ArrayList<>();

        return Problem.builder()
                .name(problemDTO.getTitle())
                .description(problemDTO.getDescription())
                .addedAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .functionName(problemDTO.getFunctionName())
                .outputDataType(problemDTO.getOutputDataType())
                .point(point)
                .difficultyLevel(difficulty)
                .isDeleted(problemDTO.isDeleted())
                .owner(user)
                .topics(topics)
                .build();
    }

    private int getPointFromDifficulty(Problem.EDifficultyLevel difficulty) {
        int point = 0;
        switch (difficulty) {
            case EASY -> point = 2;
            case NORMAL -> point = 5;
            case HARD -> point = 10;
        }

        return point;
    }

    private void createAndSaveParameterFromRequest(TestCase testCase, List<InputDTO> inputDTOs) {
        for (InputDTO input : inputDTOs) {
            Parameter parameter = Parameter.builder()
                    .inputDataType(input.getDatatype())
                    .name(input.getParamName())
                    .inputData(input.getValue())
                    .testCase(testCase)
                    .build();
            parameterRepository.save(parameter);
        }
    }
}
