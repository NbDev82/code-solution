package com.university.codesolution.comment.controller;

import com.university.codesolution.comment.dto.BlogCommentDTO;
import com.university.codesolution.comment.dto.CommentDTO;
import com.university.codesolution.comment.entity.Comment;
import com.university.codesolution.comment.mapper.BlogCommentMapper;
import com.university.codesolution.comment.mapper.CommentMapper;
import com.university.codesolution.comment.service.BlogCommentService;
import io.swagger.v3.oas.models.responses.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api")
public class BlogCommentController {
    private  BlogCommentService commentService;
    private  BlogCommentMapper blogCommentMapper;
    private CommentMapper commentMapper;
    @PostMapping("/post/{postId}/comments")
    public ResponseEntity<BlogCommentDTO> createComment(@RequestBody BlogCommentDTO blogCommentDTO, @PathVariable Long postId)
    {
        Comment createComment = this.commentService.createComment(blogCommentDTO, postId);

        return new ResponseEntity<BlogCommentDTO>(this.blogCommentMapper.toDto(createComment), HttpStatus.CREATED);
    }

    @GetMapping("/post/comment/{commendId}")
    public ResponseEntity<BlogCommentDTO> getCommentById(@PathVariable Long commendId){
        Comment comment = this.commentService.getCommentById(commendId);
        BlogCommentDTO blogCommentDTO = this.blogCommentMapper.toDto(comment);
        return new ResponseEntity<BlogCommentDTO>(blogCommentDTO,HttpStatus.OK);
    }

    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<ApiResponse> deleteComment(@PathVariable Long commentId){
        this.commentService.deleteCommentById(commentId);
        return new ResponseEntity<ApiResponse>(new ApiResponse().description("Delete is successfully"),HttpStatus.OK);
    }
    @GetMapping("/posts/comments/{discussId}")
    public ResponseEntity<List<BlogCommentDTO>> getCommentByDiscuss(@PathVariable Long discussId){
        List<Comment> comments = this.commentService.getCommentByDiscuss(discussId);
        return new ResponseEntity<List<BlogCommentDTO>>(this.blogCommentMapper.dtos(comments),HttpStatus.OK );
    }
    @GetMapping("/post/comments/{parentId}")
    public ResponseEntity<List<BlogCommentDTO>> getCommentByParent(@PathVariable Long parentId){
        List<Comment> comments = this.commentService.getAllCommentsByParentId(parentId);
        return new ResponseEntity<List<BlogCommentDTO>>(this.blogCommentMapper.dtos(comments),HttpStatus.OK );
    }

}
