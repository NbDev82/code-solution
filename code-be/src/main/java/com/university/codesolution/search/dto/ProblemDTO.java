package com.university.codesolution.search.dto;

import com.university.codesolution.search.enums.EStatus;
import com.university.codesolution.submitcode.problem.entity.Problem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.DecimalFormat;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ProblemDTO {
    private Long id;
    private String title;
    private Problem.EDifficultyLevel difficulty;
    private boolean isDeleted;
    private EStatus status;
    private int acceptedCount;
    private int submissionCount;
    private String acceptanceRate;

    public void setAcceptanceRate() {
        if(submissionCount <= 0) {
            this.acceptanceRate = "0";
            return;
        }
        double acceptanceRate = ((double) acceptedCount /submissionCount)*100;
        double roundedNumber = (double) Math.round(acceptanceRate * 100) / 100;
        DecimalFormat df = new DecimalFormat("#.#");
        this.acceptanceRate = df.format(roundedNumber);
    }
}
