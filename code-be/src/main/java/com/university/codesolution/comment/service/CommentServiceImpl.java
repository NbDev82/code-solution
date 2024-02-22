package com.university.codesolution.comment.service;

import com.university.codesolution.comment.dto.CommentDTO;
import com.university.codesolution.comment.entity.Comment;
import com.university.codesolution.comment.exception.CommentNotFoundException;
import com.university.codesolution.comment.mapper.CommentMapper;
import com.university.codesolution.comment.repos.CommentRepository;
import com.university.codesolution.comment.request.AddCommentRequest;
import com.university.codesolution.comment.request.UpdateCommentRequest;
import com.university.codesolution.login.mapper.UserMapper;
import com.university.codesolution.login.service.UserService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {
    private static final Logger log = LogManager.getLogger(CommentServiceImpl.class);

    @Autowired
    private CommentRepository commentRepos;

    @Autowired
    private UserService userService;

//    @Autowired
//    private ProblemService problemService;

    @Autowired
    private UserMapper userMapper;

//    @Autowired
//    private ProblemMapper problemMapper;

    @Autowired
    private CommentMapper commentMapper;

    @Override
    public CommentDTO add(AddCommentRequest request) {
        Comment comment = Comment.builder()
                .text(request.text())
                .isDeleted(false)
                .user(userMapper.toEntity(
                                userService.getUserById(request.userId())
                        )
                )
//                .problem(problemMapper.toEntity(
//                                problemService.getProblemById(request.problemId())
//                        )
//                )
                .commentParent(commentRepos.findById(request.commentId())
                        .orElse(null))
                .build();

        Comment saved = commentRepos.save(comment);
        return commentMapper.toDTO(saved);
    }

    @Override
    public void delete(Long commentId) {
        Comment comment = commentRepos.findById(commentId)
                .orElseThrow(() -> new CommentNotFoundException("Could not found comment with id: "+commentId));

        commentRepos.delete(comment);
    }

    @Override
    public CommentDTO update(UpdateCommentRequest request) {
        Comment comment = commentRepos.findById(request.commentId())
                .orElseThrow(() -> new CommentNotFoundException("Could not found comment with id: "+request.commentId()));

        comment.setUpdatedAt(request.updatedAt());
        comment.setText(request.text());

        commentRepos.save(comment);

        return commentMapper.toDTO(comment);
    }

    @Override
    public CommentDTO getById(Long commentId) {
        return commentMapper.toDTO(commentRepos.findById(commentId).orElseThrow(() -> new CommentNotFoundException("Could not found comment with id: "+commentId)));
    }

    @Override
    public List<CommentDTO> getByDiscussId(Long discussId) {
        return null;
    }
}
