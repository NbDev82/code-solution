package com.university.codesolution.submitcode.DTO;

import com.university.codesolution.submitcode.submission.enums.ELanguage;
import com.university.codesolution.submitcode.submission.enums.EStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SubmissionDTO {
    private Long id;
    private ELanguage language;
    private String codeSubmitted;
    private double score;
    private EStatus status;
    private String runtime;
    private String memory;
    private String createdAt;
}
