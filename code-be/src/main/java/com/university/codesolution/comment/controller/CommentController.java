package com.university.codesolution.comment.controller;

import com.university.codesolution.comment.Constants;
import com.university.codesolution.comment.dto.CommentDTO;
import com.university.codesolution.comment.exception.InvalidCommentLengthException;
import com.university.codesolution.comment.request.AddCommentRequest;
import com.university.codesolution.comment.request.ReplyCommentRequest;
import com.university.codesolution.comment.request.UpdateCommentRequest;
import com.university.codesolution.comment.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comment")
public class CommentController {
    private static final Logger log = LogManager.getLogger(CommentController.class);

    @Autowired
    private CommentService commentService;

    @Operation(
            summary = "Add comment",
            description = "Add a new comment by information is provided in the request body",
            responses = {
                    @ApiResponse(
                            description = "Comment added successfully",
                            responseCode = "201"
                    )
            }
    )
    @PostMapping("/add-comment")
    public ResponseEntity<CommentDTO> addComment(@RequestBody AddCommentRequest request) {
        int MINIMUM_LENGTH_OF_MESSAGE = 10;
        if(request.text().length() < MINIMUM_LENGTH_OF_MESSAGE)
            throw new InvalidCommentLengthException("Comment must not less than 10 characters");

        CommentDTO response = commentService.add(request);
        log.info(Constants.ADD_COMMENT_SUCCESSFULLY);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping("/reply-comment")
    public ResponseEntity<String> replyComment(@RequestBody ReplyCommentRequest request) {
        int MINIMUM_LENGTH_OF_MESSAGE = 10;
        if(request.text().length() < MINIMUM_LENGTH_OF_MESSAGE)
            throw new InvalidCommentLengthException("Comment must not less than 10 characters");

        commentService.reply(request);
        log.info(Constants.REPLY_COMMENT_SUCCESSFULLY);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Constants.REPLY_COMMENT_SUCCESSFULLY);
    }

    @Operation(
            summary = "Get list comment",
            description = "Retrieved list comment for a specific problem is provided in the request body",
            responses = {
                    @ApiResponse(
                            description = "Comments retrieved successfully",
                            responseCode = "200"
                    )
            }
    )
    @GetMapping("/get-comments/{problemId}")
    public ResponseEntity<List<CommentDTO>> getComments(@PathVariable Long problemId) {
        List<CommentDTO> commentDTOs = commentService.getByProblemId(problemId);
        log.info(Constants.COMMENTS_RETRIEVED_SUCCESSFULLY);
        return ResponseEntity.ok(commentDTOs);
    }

    @Operation(
            summary = "Update comment",
            description = "Update comment by information is provided in the request body",
            responses = {
                    @ApiResponse(
                            description = "Comment updated successfully",
                            responseCode = "200"
                    )
            }
    )
    @PutMapping("/update-comment")
    public ResponseEntity<CommentDTO> updateComment(@RequestBody UpdateCommentRequest request) {
        CommentDTO commentDTO = commentService.update(request);
        log.info(Constants.UPDATE_COMMENT_SUCCESSFULLY);
        return ResponseEntity.ok(commentDTO);
    }

    @Operation(
            summary = "Delete comment",
            description = "Delete a existing comment by commentId is provided in the request body",
            responses = {
                    @ApiResponse(
                            description = "Comment deleted successfully",
                            responseCode = "200"
                    )
            }
    )
    @DeleteMapping("/delete-comment")
    public ResponseEntity<String> deleteComment(Long commentId) {
        commentService.delete(commentId);
        log.info(Constants.DELETE_COMMENT_SUCCESSFULLY);
        return ResponseEntity.ok(Constants.DELETE_COMMENT_SUCCESSFULLY);
    }
}
