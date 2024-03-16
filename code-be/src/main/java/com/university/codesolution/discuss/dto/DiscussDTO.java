package com.university.codesolution.discuss.dto;

import com.university.codesolution.discuss.entity.Category;
import com.university.codesolution.login.dto.UserDTO;
import com.university.codesolution.login.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
public class DiscussDTO {
    private String topic;
    private String content;
    private String image;
    private LocalDateTime dateTime;
    private CategoryDTO category;
    private UserDTO user;
}
