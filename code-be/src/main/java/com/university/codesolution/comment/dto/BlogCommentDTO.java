package com.university.codesolution.comment.dto;

import com.university.codesolution.login.dto.UserDTO;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class BlogCommentDTO {
    private Long id;
    private String text;
    private UserDTO user;
    private Long commentParent;
    private LocalDateTime updatedAt;


}
