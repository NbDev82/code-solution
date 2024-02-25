package com.university.codesolution.comment.service;

import com.university.codesolution.comment.dto.CommentDTO;
import com.university.codesolution.comment.request.AddCommentRequest;
import com.university.codesolution.comment.request.UpdateCommentRequest;

import java.util.List;

public interface CommentService {
    CommentDTO add(AddCommentRequest request);
    void delete(Long commentId);
    CommentDTO update(UpdateCommentRequest request);
    CommentDTO getById(Long commentId);
    List<CommentDTO> getByDiscussId(Long discussId);
}
