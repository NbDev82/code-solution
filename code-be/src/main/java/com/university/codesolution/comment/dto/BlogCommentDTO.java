package com.university.codesolution.comment.dto;

import com.university.codesolution.comment.entity.Comment;
import com.university.codesolution.comment.mapper.BlogCommentMapper;
import com.university.codesolution.login.dto.UserDTO;
import com.university.codesolution.login.entity.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
public class BlogCommentDTO {
    private Long id;
    private String text;
    private UserDTO user;
    private Long commentParent;
    private LocalDateTime updatedAt;


}
