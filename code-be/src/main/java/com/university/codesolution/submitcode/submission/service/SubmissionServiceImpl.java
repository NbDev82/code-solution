package com.university.codesolution.submitcode.submission.service;

import com.university.codesolution.login.entity.User;
import com.university.codesolution.login.exception.UserNotFoundException;
import com.university.codesolution.login.mapper.UserMapper;
import com.university.codesolution.login.repository.UserRepos;
import com.university.codesolution.login.service.UserService;
import com.university.codesolution.submitcode.DTO.SubmissionDTO;
import com.university.codesolution.submitcode.ECompilerConstants;
import com.university.codesolution.submitcode.exception.UnsupportedLanguageException;
import com.university.codesolution.submitcode.parameter.service.ParameterService;
import com.university.codesolution.submitcode.problem.service.ProblemService;
import com.university.codesolution.submitcode.strategy.CompilerProcessor;
import com.university.codesolution.submitcode.strategy.CompilerResult;
import com.university.codesolution.submitcode.strategy.CompilerStrategy;
import com.university.codesolution.submitcode.strategy.JavaCompiler;
import com.university.codesolution.submitcode.DTO.ResultDTO;
import com.university.codesolution.submitcode.problem.entity.Problem;
import com.university.codesolution.submitcode.submission.entity.Submission;
import com.university.codesolution.submitcode.submission.mapper.SubmissionMapper;
import com.university.codesolution.submitcode.submission.repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class SubmissionServiceImpl implements SubmissionService{
    private CompilerStrategy compilerStrategy = null;

    private final SubmissionRepository submissionRepos;
    private final UserRepos userRepos;
    private final UserService userService;
    private final ParameterService parameterService;
    private final ProblemService problemService;
    private final UserMapper userMapper;
    private final SubmissionMapper submissionMapper;

    @Autowired
    public SubmissionServiceImpl(SubmissionRepository submissionRepos,
                                 UserRepos userRepos,
                                 UserService userService,
                                 ParameterService parameterService,
                                 ProblemService problemService,
                                 UserMapper userMapper,
                                 SubmissionMapper submissionMapper) {
        this.submissionRepos = submissionRepos;
        this.userRepos = userRepos;
        this.userService = userService;
        this.parameterService = parameterService;
        this.problemService = problemService;
        this.userMapper = userMapper;
        this.submissionMapper = submissionMapper;
    }

    @Override
    public String getInputCode(Problem problem, Submission.ELanguage eLanguage) {
        compilerStrategy = determineCompilerStrategy(eLanguage);
        return compilerStrategy.createInputCode(problem , "", problem.getTestCases().get(0));
    }

    @Override
    public ResultDTO compile(String code, Submission.ELanguage eLanguage) {
        compilerStrategy = determineCompilerStrategy(eLanguage);

        String fileName = "Solution.java";
        prepareFile(fileName, code);

        CompilerResult compilerResult = compilerStrategy.compile(code,fileName);

        return createResultDTO(compilerResult);
    }

    private ResultDTO createResultDTO(CompilerResult compilerResult) {
        return ResultDTO.builder()
                .isAccepted(compilerResult.getCompilerConstants().equals(ECompilerConstants.SUCCESS))
                .message(compilerResult.getError())
                .status(compilerResult.getCompilerConstants().equals(ECompilerConstants.SUCCESS)
                        ? Submission.EStatus.ACCEPTED
                        : Submission.EStatus.COMPILE_ERROR)
                .build();
    }

    @Override
    public ResultDTO runCode(Long userId, String code, Problem problem, Submission.ELanguage eLanguage) {
        compilerStrategy = determineCompilerStrategy(eLanguage);

        User user = userMapper.toEntity(userService.getUserById(userId));
        if(user == null) {
            throw new UserNotFoundException("User not found with Id: "+userId);
        }

        String fileName = "Solution.java";
        prepareFile(fileName, code);
        CompilerResult compilerResult = compilerStrategy.compile(code,fileName);

        if(compilerResult.getCompilerConstants().equals(ECompilerConstants.SUCCESS)) {
            CompilerProcessor compilerProcessor = new CompilerProcessor(compilerStrategy);
            ResultDTO resultDTO = compilerProcessor.run(code,problem);

            handleSuccessfulExecution(user, resultDTO, eLanguage, code, problem);

            return resultDTO;
        }
        else {
            handleCompilationError(user, code, problem);
            return createCompilationErrorResultDTO(compilerResult.getError());
        }
    }

    private ResultDTO createCompilationErrorResultDTO(String error) {
        return ResultDTO.builder()
                .status(Submission.EStatus.COMPILE_ERROR)
                .message(error)
                .isAccepted(false)
                .build();
    }

    private Submission createSubmission(User user, String code, Problem problem, Submission.ELanguage eLanguage, Submission.EStatus status) {
        return Submission.builder()
                .language(eLanguage)
                .codeSubmitted(code)
                .createdAt(LocalDateTime.now())
                .status(status)
                .user(user)
                .problem(problem)
                .build();
    }

    private void handleCompilationError(User user, String code, Problem problem) {
        Submission submission = createSubmission(user, code, problem, Submission.ELanguage.JAVA, Submission.EStatus.COMPILE_ERROR);
        addSubmission(user, submission);
    }

    private void handleSuccessfulExecution(User user, ResultDTO resultDTO, Submission.ELanguage eLanguage, String code, Problem problem) {
        if(!resultDTO.getStatus().equals(Submission.EStatus.COMPILE_ERROR)) {
            Submission submission = createSubmission(user, code, problem, eLanguage, resultDTO.getStatus());
            submission.setMemory(resultDTO.getMemory());
            submission.setRuntime(resultDTO.getRuntime());
            submission.setScore(Double.parseDouble(resultDTO.getPassedTestcase()));

            addSubmission(user, submission);
            plusScore(user, problem);
        }
    }

    private void prepareFile(String fileName, String code) {
        compilerStrategy.deleteFileCompiled();
        compilerStrategy.writeFile(fileName, code);
    }

    private CompilerStrategy determineCompilerStrategy(Submission.ELanguage eLanguage) {
        return switch (eLanguage) {
            case JAVA -> new JavaCompiler(parameterService);
            case PYTHON, CSHARP ->
                    throw new UnsupportedLanguageException("Language " + eLanguage.name().toLowerCase() + " is not supported yet!");
        };
    }

    @Override
    public List<SubmissionDTO> getByUserIdAndProblemId(Long userId, String problemName) {
        User user = userMapper.toEntity(userService.getUserById(userId));
        Problem problem = problemService.getEntityByProblemName(problemName);
        List<Submission> submissions = submissionRepos.findByUserAndProblem(user,problem);
        submissions.sort((submissionA, submissionB) -> submissionB.getCreatedAt().compareTo(submissionA.getCreatedAt()));
        return submissionMapper.toDTOs(submissions);
    }

    public void addSubmission(User user, Submission submission) {
        List<Submission> submissions = user.getSubmissions();
        if (submissions == null) {
            submissions = new ArrayList<>();
        }
        submissions.add(submission);
        user.setSubmissions(submissions);
        userRepos.save(user);
    }

    private void plusScore(User user, Problem problem) {
        if(isNotExistAcceptedSubmissionBefore(user, problem)) {
            double score = user.getCumulativeScore() + problem.getPoint();
            user.setCumulativeScore(score);
            userRepos.save(user);
        }
    }

    private boolean isNotExistAcceptedSubmissionBefore(User user, Problem problem) {
        return submissionRepos.findByUserAndProblem(user, problem).isEmpty();
    }
}
