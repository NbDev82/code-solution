package com.university.codesolution.search.controller;

import com.university.codesolution.search.dto.SearchResultDTO;
import com.university.codesolution.search.requestmodel.SearchRequest;
import com.university.codesolution.search.service.SearchService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/search")
public class SearchController {
    private static final Logger log = LogManager.getLogger(SearchController.class);
    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @PostMapping("/problems")
    public ResponseEntity<SearchResultDTO> getProblems(@RequestBody SearchRequest request) {
        SearchResultDTO searchResultDTO = searchService.getProblems(request);
        return ResponseEntity.ok(searchResultDTO);
    }
}
