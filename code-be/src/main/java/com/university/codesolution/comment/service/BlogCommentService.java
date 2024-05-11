package com.university.codesolution.comment.service;

import com.university.codesolution.comment.dto.BlogCommentDTO;
import com.university.codesolution.comment.entity.Comment;

import java.util.List;


public interface BlogCommentService {
    Comment createComment(BlogCommentDTO blogCommentDTO, Long discussId, Long userId);
    List<Comment> getCommentByDiscuss(Long discussId);
    Comment getCommentById(Long commentId);
    List<Comment> getAllCommentsByParentId(Long parentId);
     void deleteCommentById(Long commentId);
}
