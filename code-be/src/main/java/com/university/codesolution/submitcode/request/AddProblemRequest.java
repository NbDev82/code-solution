package com.university.codesolution.submitcode.request;

import com.university.codesolution.submitcode.DTO.AddParameterRequestDTO;
import com.university.codesolution.submitcode.DTO.AddProblemRequestDTO;
import com.university.codesolution.submitcode.DTO.AddTestCaseRequestDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class AddProblemRequest {
    private AddProblemRequestDTO problem;
    private List<String> libraries;
    private List<AddParameterRequestDTO> parameters;
    private List<AddTestCaseRequestDTO> testcases;
}
