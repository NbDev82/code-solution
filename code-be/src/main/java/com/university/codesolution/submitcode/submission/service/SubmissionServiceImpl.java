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
        compilerStrategy = switch (eLanguage) {
            case JAVA -> new JavaCompiler(parameterService);
            case PYTHON, CSHARP ->
                    throw new UnsupportedLanguageException("Language " + eLanguage.name().toLowerCase() + " is not supported yet!");
        };
        return compilerStrategy.createInputCode(problem , "", problem.getTestCases().get(0));
    }

    @Override
    public ResultDTO compile(String code, Submission.ELanguage eLanguage) {
        if(compilerStrategy == null) {
            compilerStrategy = switch (eLanguage) {
                case JAVA -> new JavaCompiler(parameterService);
                case PYTHON, CSHARP ->
                        throw new UnsupportedLanguageException("Language " + eLanguage.name().toLowerCase() + " is not supported yet!");
            };
        }

        String fileName = "Solution.java";
        if(compilerStrategy.compile(code,fileName).equals(ECompilerConstants.SUCCESS)) {
            return ResultDTO.builder()
                    .isAccepted(true)
                    .status(Submission.EStatus.ACCEPTED)
                    .build();
        } else {
            return ResultDTO.builder()
                    .isAccepted(false)
                    .status(Submission.EStatus.COMPILE_ERROR)
                    .build();
        }
    }

    @Override
    public ResultDTO runCode(Long userId, String code, Problem problem, Submission.ELanguage eLanguage) {
        compilerStrategy = switch (eLanguage) {
            case JAVA -> new JavaCompiler(parameterService);
            case PYTHON, CSHARP ->
                    throw new UnsupportedLanguageException("Language " + eLanguage.name().toLowerCase() + " is not supported yet!");
        };

        User user = userMapper.toEntity(userService.getUserById(userId));
        if(user == null) {
            throw new UserNotFoundException("User not found with Id: "+userId);
        }

        String fileName = "Solution.java";
        compilerStrategy.deleteFileCompiled();
        compilerStrategy.writeFile(fileName, code);

        ECompilerConstants isCompileSuccessful = compilerStrategy.compile(code,fileName);

        if(isCompileSuccessful.equals(ECompilerConstants.SUCCESS)) {
            CompilerProcessor compilerProcessor = new CompilerProcessor(compilerStrategy);

            ResultDTO resultDTO = compilerProcessor.run(code,problem);

            if(!resultDTO.getStatus().equals(EStatus.COMPILE_ERROR)) {
                Submission submission = Submission.builder()
                        .language(eLanguage)
                        .codeSubmitted(code)
                        .memory(resultDTO.getMemory())
                        .runtime(resultDTO.getRuntime())
                        .status(resultDTO.getStatus())
                        .createdAt(LocalDateTime.now())
                        .score(Double.parseDouble(resultDTO.getPassedTestcase()))
                        .user(user)
                        .problem(problem)
                        .build();

                addSubmission(user, submission);
            }

            return resultDTO;
        }
        else {
            Submission submission = Submission.builder()
                    .codeSubmitted(code)
                    .createdAt(LocalDateTime.now())
                    .user(user)
                    .problem(problem)
                    .language(Submission.ELanguage.JAVA)
                    .status(Submission.EStatus.COMPILE_ERROR)
                    .build();

            addSubmission(user, submission);

            return ResultDTO.builder()
                    .status(Submission.EStatus.COMPILE_ERROR)
                    .message("Can not compile your code.")
                    .isAccepted(false)
                    .build();
        }
    }

    @Override
    public void add(Submission submission) {
        submissionRepos.save(submission);
    }

    @Override
    public List<SubmissionDTO> getByUserIdAndProblemId(Long userId, String problemName) {
        User user = userMapper.toEntity(userService.getUserById(userId));
        Problem problem = problemService.getEntityByProblemName(problemName);
        List<Submission> submissions = submissionRepos.findByUserAndProblem(user,problem);
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
}
