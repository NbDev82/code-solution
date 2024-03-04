package com.university.codesolution.submitcode.problem.service;

import com.university.codesolution.submitcode.DTO.ProblemDTO;
import com.university.codesolution.submitcode.controller.SubmitCodeController;
import com.university.codesolution.submitcode.exception.ProblemNotFoundException;
import com.university.codesolution.submitcode.problem.entity.Problem;
import com.university.codesolution.submitcode.problem.mapper.ProblemMapper;
import com.university.codesolution.submitcode.problem.repository.ProblemRepository;
import com.university.codesolution.submitcode.submission.enums.EStatus;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProblemServiceImpl implements ProblemService{
    private static final Logger log = LogManager.getLogger(ProblemServiceImpl.class);

    @Autowired
    private ProblemRepository problemRepository;

    @Autowired
    private ProblemMapper mapper;

    @Override
    public ProblemDTO getByProblemName(String problemName) {
        Problem problem = problemRepository.findByName(problemName)
                .orElseThrow(() -> new ProblemNotFoundException("Requested problem not found"));
//        problemDTO.acceptedCount( problem.getSubmissions() != null ? (int) problem.getSubmissions().stream().filter(s -> s.getStatus().equals(EStatus.ACCEPTED)).count() : 0 );

        return mapper.toDTO(problem);
    }
}
