package com.university.codesolution.discuss.response;

import com.university.codesolution.discuss.dto.DiscussDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@Data
@Builder
@NoArgsConstructor
public class DiscussListResponse {
    private List<DiscussDTO> discussDTOList;
    private int totalRecord;


}
