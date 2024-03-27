package com.university.codesolution.submitcode.problem.service;

import com.university.codesolution.submitcode.DTO.ProblemDTO;
import com.university.codesolution.submitcode.exception.ProblemNotFoundException;
import com.university.codesolution.submitcode.problem.entity.Problem;
import com.university.codesolution.submitcode.problem.mapper.ProblemMapper;
import com.university.codesolution.submitcode.problem.repository.ProblemRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProblemServiceImpl implements ProblemService{
    private static final Logger log = LogManager.getLogger(ProblemServiceImpl.class);

    private final ProblemRepository problemRepository;

    private final ProblemMapper mapper;

    @Autowired
    public ProblemServiceImpl(ProblemRepository problemRepository,
                              ProblemMapper mapper) {
        this.problemRepository = problemRepository;
        this.mapper = mapper;
    }

    @Override
    public ProblemDTO getByProblemName(String problemName) {
        Problem problem = getEntityByProblemName(problemName);
        log.info("get problemDTO from ProblemServiceImpl");
        return mapper.toDTO(problem);
    }

    @Override
    public Problem getEntityByProblemName(String problemName) {
        log.info("get problem from ProblemServiceImpl");
        return problemRepository.findByName(problemName)
                .orElseThrow(() -> new ProblemNotFoundException("Requested problem not found"));
    }
}
