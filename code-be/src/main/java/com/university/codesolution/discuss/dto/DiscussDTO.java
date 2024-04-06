package com.university.codesolution.discuss.dto;

import com.university.codesolution.comment.dto.BlogCommentDTO;
import com.university.codesolution.comment.entity.Comment;
import com.university.codesolution.discuss.entity.Category;
import com.university.codesolution.login.dto.UserDTO;
import com.university.codesolution.login.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
public class DiscussDTO {
    private Long id;
    private String topic;
    private String content;
    private String image;
    private LocalDateTime startDate;
    private CategoryDTO category;
    private UserDTO user;
    private List<BlogCommentDTO> comments ;
}
