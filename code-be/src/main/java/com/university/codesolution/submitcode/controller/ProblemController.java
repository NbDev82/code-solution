package com.university.codesolution.submitcode.controller;

import com.university.codesolution.submitcode.DTO.ProblemDTO;
import com.university.codesolution.submitcode.problem.service.ProblemService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/problems")
public class ProblemController {
    private static final Logger log = LogManager.getLogger(ProblemController.class);

    @Autowired
    private ProblemService problemService;

    @GetMapping("/findById")
    public ResponseEntity<ProblemDTO> fetchProblem(Long problemId) {
        ProblemDTO problemDTO = problemService.findById(problemId, ProblemDTO.class);
        log.info("Fetching problem by id: {}", problemId);
        return ResponseEntity.ok(problemDTO);
    }
}
