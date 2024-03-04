package com.university.codesolution.submitcode.controller;

import com.university.codesolution.submitcode.DTO.ProblemDTO;
import com.university.codesolution.submitcode.problem.service.ProblemService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/problems")
public class ProblemController {
    private static final Logger log = LogManager.getLogger(ProblemController.class);

    @Autowired
    private ProblemService problemService;

    @GetMapping("/{problemName}")
    public ResponseEntity<ProblemDTO> fetchProblem(@PathVariable String problemName) {
        problemName = problemName.replace("-", " ");
        ProblemDTO problemDTO = problemService.getByProblemName(problemName);
        log.info("Fetching problem by name: {}", problemName);
        return ResponseEntity.ok(problemDTO);
    }
}
