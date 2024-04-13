package com.university.codesolution.comment.dto;

import com.university.codesolution.comment.entity.Comment;
import com.university.codesolution.discuss.entity.Discuss;
import com.university.codesolution.login.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CommentDTO {
    private Long id;
    private String text;
    private String updatedAt;
    private String userName;

    private List<CommentDTO> replyComments;
}
