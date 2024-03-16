package com.university.codesolution.comment.controller;

import com.university.codesolution.comment.dto.CommentDTO;
import com.university.codesolution.comment.service.BlogCommentService;
import io.swagger.v3.oas.models.responses.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@AllArgsConstructor
@RestController
@RequestMapping("/api")
public class BlogCommentController {
    private  BlogCommentService commentService;
    @PostMapping("/post/{postId}/comments")
    public ResponseEntity<CommentDTO> createComment(@RequestBody CommentDTO commentDTO, @PathVariable Long postId)
    {
        CommentDTO createComment = this.commentService.createComment(commentDTO, postId);
        return new ResponseEntity<CommentDTO>(createComment, HttpStatus.CREATED);
    }
    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<ApiResponse> deleteComment(@PathVariable Long commentId){
        this.commentService.deleteCommentById(commentId);
        return new ResponseEntity<ApiResponse>(new ApiResponse().description("Delete is successfully"),HttpStatus.OK);
    }

}
