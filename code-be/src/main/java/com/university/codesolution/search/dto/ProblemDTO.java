package com.university.codesolution.search.dto;

import com.university.codesolution.search.enums.EStatus;
import com.university.codesolution.submitcode.problem.entity.Problem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.DecimalFormat;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ProblemDTO {
    private String title;
    private Problem.EDifficultyLevel difficulty;
    private boolean isDeleted;
    private EStatus status;
    private int acceptedCount;
    private int submissionCount;

    public String getAcceptanceRate() {
        double acceptanceRate = ((double) acceptedCount /submissionCount)*100;
        double roundedNumber = Math.round(acceptanceRate / 10.0) * 10.0;
        DecimalFormat df = new DecimalFormat("#.#");
        return df.format(roundedNumber);
    }
}
