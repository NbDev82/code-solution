package com.university.codesolution.submitcode.request;

import com.university.codesolution.submitcode.problem.entity.Problem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SubmitCodeRequest {
    private String code;
    private String language;
    private Problem problem;
}

