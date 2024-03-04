package com.university.codesolution.submitcode.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class TestCaseResultDTO {
    private String outputData;
    private String outputDatatype;

    private String expected;
    private String expectedDatatype;

    private boolean isPassed;
}
