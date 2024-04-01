package com.university.codesolution.search.controller;
import com.university.codesolution.contest.service.ContestService;
import com.university.codesolution.search.service.SearchService;
import com.university.codesolution.search.service.SearchServiceImpl;
import com.university.codesolution.submitcode.DTO.ProblemDTO;
import com.university.codesolution.submitcode.controller.ProblemController;
import com.university.codesolution.submitcode.problem.service.ProblemService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/search")
public class SearchController {
    private static final Logger log = LogManager.getLogger(SearchController.class);
    private SearchService searchService;
    @GetMapping("/problems")
    public ResponseEntity<List<ProblemDTO>> getProblems(int page, int limit, String searchTerm) {

        return null;
    }
}
