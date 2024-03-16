package com.university.codesolution.comment.service;

import com.university.codesolution.comment.dto.CommentDTO;
import org.springframework.stereotype.Service;


public interface BlogCommentService {
    CommentDTO createComment(CommentDTO commentDTO, Long discussId);
     void deleteCommentById(Long commentId);
}
