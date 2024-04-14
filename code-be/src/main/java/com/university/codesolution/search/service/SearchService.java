package com.university.codesolution.search.service;

import com.university.codesolution.search.dto.ProblemDTO;
import com.university.codesolution.search.dto.SearchResultDTO;
import com.university.codesolution.search.requestmodel.SearchRequest;

import java.util.List;

public interface SearchService {
    SearchResultDTO getProblems(SearchRequest request);
}
