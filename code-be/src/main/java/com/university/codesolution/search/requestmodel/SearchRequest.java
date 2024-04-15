package com.university.codesolution.search.requestmodel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SearchRequest {
    private Long userId;

    private int pageNumber;
    private int limit;
    private String status;
    private String difficulty;
    private String topic;
    private String searchTerm;
}
