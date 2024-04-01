package com.university.codesolution.submitcode.DTO;

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
    private String name;
    private String description;
    private String questionText;
    private double point;
    private String difficultyLevel;
    private boolean isDeleted;
    private int acceptedCount;
    private int discussCount;
    private int submissionCount;
    private String acceptanceRate = getAcceptanceRate();

    private String type;

    public String getAcceptanceRate() {
        double acceptanceRate = ((double) acceptedCount /submissionCount)*100;
        double roundedNumber = Math.round(acceptanceRate * 10.0) / 10.0;
        DecimalFormat df = new DecimalFormat("#.#");
        return df.format(roundedNumber);
    }
}
