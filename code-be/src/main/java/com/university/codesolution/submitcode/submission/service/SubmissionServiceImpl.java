package com.university.codesolution.submitcode.submission.service;

import com.university.codesolution.login.entity.User;
import com.university.codesolution.login.mapper.UserMapper;
import com.university.codesolution.login.repository.UserRepos;
import com.university.codesolution.login.service.UserService;
import com.university.codesolution.submitcode.CompilerConstants;
import com.university.codesolution.submitcode.exception.UnsupportedLanguageException;
import com.university.codesolution.submitcode.parameter.service.ParameterService;
import com.university.codesolution.submitcode.strategy.CompilerProcessor;
import com.university.codesolution.submitcode.strategy.CompilerStrategy;
import com.university.codesolution.submitcode.strategy.JavaCompiler;
import com.university.codesolution.submitcode.DTO.ResultDTO;
import com.university.codesolution.submitcode.problem.entity.Problem;
import com.university.codesolution.submitcode.submission.entity.Submission;
import com.university.codesolution.submitcode.submission.enums.ELanguage;
import com.university.codesolution.submitcode.submission.enums.EStatus;
import com.university.codesolution.submitcode.submission.repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class SubmissionServiceImpl implements SubmissionService{
    private CompilerStrategy compilerStrategy = null;

    @Autowired
    private SubmissionRepository submissionRepos;
    @Autowired
    private UserRepos userRepos;

    @Autowired
    private UserService userService;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private ParameterService parameterService;

    @Override
    public String getInputCode(Problem problem, ELanguage eLanguage) {
        compilerStrategy = switch (eLanguage) {
            case JAVA -> new JavaCompiler(parameterService);
            case PYTHON, CSHARP ->
                    throw new UnsupportedLanguageException("Language " + eLanguage.name().toLowerCase() + " is not supported yet!");
        };
        return compilerStrategy.createInputCode(problem , "", problem.getTestCases().get(0));
    }

    @Override
    public ResultDTO compile(String code, ELanguage eLanguage) {
        if(compilerStrategy == null) {
            compilerStrategy = switch (eLanguage) {
                case JAVA -> new JavaCompiler(parameterService);
                case PYTHON, CSHARP ->
                        throw new UnsupportedLanguageException("Language " + eLanguage.name().toLowerCase() + " is not supported yet!");
            };
        }

        String fileName = "Solution.java";
        if(compilerStrategy.compile(code,fileName)) {
            return ResultDTO.builder()
                    .isAccepted(true)
                    .status(EStatus.ACCEPTED)
                    .build();
        } else {
            return ResultDTO.builder()
                    .isAccepted(false)
                    .status(EStatus.COMPILE_ERROR)
                    .build();
        }
    }

    @Override
    public ResultDTO runCode(Long userId, String code, Problem problem, ELanguage eLanguage) {
        compilerStrategy = switch (eLanguage) {
            case JAVA -> new JavaCompiler(parameterService);
            case PYTHON, CSHARP ->
                    throw new UnsupportedLanguageException("Language " + eLanguage.name().toLowerCase() + " is not supported yet!");
        };

        User user = userMapper.toEntity(userService.getUserById(userId));
        String fileName = "Solution.java";
        compilerStrategy.deleteFileCompiled();
        compilerStrategy.writeFile(fileName, code);

        boolean isCompileSuccessful = compilerStrategy.compile(code,fileName);

        if(isCompileSuccessful) {
            CompilerProcessor compilerProcessor = new CompilerProcessor(compilerStrategy);

            ResultDTO resultDTO = compilerProcessor.run(code,problem);
            Submission submission = Submission.builder()
                    .language(eLanguage)
                    .codeSubmitted(code)
                    .status(resultDTO.getStatus())
                    .createdAt(LocalDateTime.now())
                    .score(Double.parseDouble(resultDTO.getPassedTestcase()))
                    .user(user)
                    .problem(problem)
                    .build();

            if (user != null) {
                List<Submission> submissions = user.getSubmissions();
                if (submissions == null) {
                    submissions = new ArrayList<>(); // hoặc sử dụng bất kỳ cấu trúc dữ liệu nào phù hợp
                    user.setSubmissions(submissions);
                }
                submissions.add(submission);
                userRepos.save(user);
            }

            return resultDTO;
        }
        else {
            Submission submission = Submission.builder()
                    .codeSubmitted(code)
                    .createdAt(LocalDateTime.now())
                    .user(user)
                    .problem(problem)
                    .language(ELanguage.JAVA)
                    .status(EStatus.COMPILE_ERROR)
                    .build();
            submissionRepos.save(submission);

            return ResultDTO.builder()
                    .status(EStatus.COMPILE_ERROR)
                    .isAccepted(false)
                    .build();
        }
    }

    @Override
    public void add(Submission submission) {
        submissionRepos.save(submission);
    }

    @Override
    public List<Submission> getByUserIdAndProblemId(Long userId, Long problemId) {
        User user = userMapper.toEntity(userService.getUserById(userId));
        Problem problem = null;
        return submissionRepos.findByUserAndProblem(user,problem);
    }
}
