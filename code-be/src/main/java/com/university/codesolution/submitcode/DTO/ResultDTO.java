package com.university.codesolution.submitcode.DTO;

import com.university.codesolution.submitcode.submission.enums.EStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ResultDTO {
    private EStatus status;
    private boolean isAccepted;
    private String message;

    private List<TestCaseResultDTO> testCaseResultDTOS;

    private String passedTestcase;
    private String maxTestcase;

    private double runtime;
    private double memory;


}
