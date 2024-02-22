package com.university.codesolution.comment.dto;

import com.university.codesolution.comment.entity.Comment;
import com.university.codesolution.login.entity.User;
import com.university.codesolution.submitcode.entity.Problem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CommentDTO {
    private Long id;
    private String text;
    private boolean isDeleted;
    private User user;
    private Problem problem;
    private Comment commentParent;
}
