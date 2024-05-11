package com.university.codesolution.search.service;

import com.university.codesolution.search.dto.SearchResultDTO;
import com.university.codesolution.search.requestmodel.SearchRequest;

public interface SearchService {
    SearchResultDTO getProblems(SearchRequest request);
}
