package com.university.codesolution.submitcode.controller;

import com.university.codesolution.submitcode.DTO.ProblemDTO;
import com.university.codesolution.submitcode.problem.entity.Problem;
import com.university.codesolution.submitcode.problem.service.ProblemService;
import com.university.codesolution.submitcode.request.AddProblemRequest;
import lombok.NonNull;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/get-all")
    public ResponseEntity<List<ProblemDTO>> fetchAll() {
        return ResponseEntity.ok(problemService.getAllDTOs());
    }

    @GetMapping("/get-problems-by-owner")
    public ResponseEntity<List<ProblemDTO>> getProblemsByOwner(Long userId) {
        log.info("Fetching problems by owner id: {}", userId);

        return ResponseEntity.ok(problemService.getProblemsByOwner(userId));
    }

    @GetMapping("/get-problems-by-owner-and-name")
    public ResponseEntity<List<ProblemDTO>> getProblemsByOwnerAndName(
            @RequestParam("userId") Long userId,
            @RequestParam("name") String problemName
    ) {
        return ResponseEntity.ok(problemService.getProblemsByOwnerAndName(userId, problemName));
    }

    @PostMapping("/add")
    public ResponseEntity<Boolean> addProblem(@RequestBody @NonNull AddProblemRequest request) {
        return ResponseEntity.ok(problemService.add(request));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Boolean> deleteProblem(@RequestParam Long problemId) {
        try {
            return ResponseEntity.ok(problemService.delete(problemId));
        } catch (Exception e){
            log.info(e.getMessage());
            return ResponseEntity.ok(false);
        }
    }
}
