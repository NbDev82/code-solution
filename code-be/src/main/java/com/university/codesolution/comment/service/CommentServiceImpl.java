package com.university.codesolution.comment.service;

import com.university.codesolution.comment.dto.CommentDTO;
import com.university.codesolution.comment.entity.Comment;
import com.university.codesolution.comment.exception.CommentNotFoundException;
import com.university.codesolution.comment.mapper.CommentMapper;
import com.university.codesolution.comment.repos.CommentRepository;
import com.university.codesolution.comment.request.AddCommentRequest;
import com.university.codesolution.comment.request.ReplyCommentRequest;
import com.university.codesolution.comment.request.UpdateCommentRequest;
import com.university.codesolution.login.service.UserService;
import com.university.codesolution.submitcode.problem.entity.Problem;
import com.university.codesolution.submitcode.problem.service.ProblemService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {
    private static final Logger log = LogManager.getLogger(CommentServiceImpl.class);

    private final CommentRepository commentRepos;

    private final UserService userService;
    private final ProblemService problemService;

    private final CommentMapper commentMapper;

    public CommentServiceImpl(CommentRepository commentRepos, UserService userService, ProblemService problemService, CommentMapper commentMapper) {
        this.commentRepos = commentRepos;
        this.userService = userService;
        this.problemService = problemService;
        this.commentMapper = commentMapper;
    }

    @Override
    public CommentDTO add(AddCommentRequest request) {
        Comment comment = Comment.builder()
                .text(request.text())
                .updatedAt(LocalDateTime.now())
                .isDeleted(false)
                .user(userService.getEntityUserById(request.userId())
                )
                .problem(problemService.findById(request.problemId(), Problem.class))
                .build();

        Comment saved = commentRepos.save(comment);
        return commentMapper.toDTO(saved);
    }

    @Override
    public void delete(Long commentId) {
        Comment comment = commentRepos.findById(commentId)
                .orElseThrow(() -> new CommentNotFoundException("Could not found comment with id: "+commentId));

        comment.setDeleted(true);
        commentRepos.save(comment);
    }

    @Override
    public CommentDTO update(UpdateCommentRequest request) {
        Comment comment = commentRepos.findById(request.commentId())
                .orElseThrow(() -> new CommentNotFoundException("Could not found comment with id: "+request.commentId()));

        comment.setUpdatedAt(LocalDateTime.now());
        comment.setText(request.text());

        commentRepos.save(comment);

        return commentMapper.toDTO(comment);
    }

    @Override
    public CommentDTO getById(Long commentId) {
        return commentMapper.toDTO(commentRepos.findById(commentId).orElseThrow(() -> new CommentNotFoundException("Could not found comment with id: "+commentId)));
    }

    @Override
    public List<CommentDTO> getByProblemId(Long problemId) {
        return commentMapper.toDTOs(commentRepos.findByProblemId(problemId));
    }

    @Override
    public List<CommentDTO> getByCommentId(Long commentId) {
        List<Comment> comments = commentRepos.findByCommentId(commentId);
        return commentMapper.toDTOs(comments);
    }

    @Override
    public CommentDTO reply(ReplyCommentRequest request) {
        if (request.commentId() == null)
            return null;

        Comment comment = Comment.builder()
                .text(request.text())
                .isDeleted(false)
                .updatedAt(LocalDateTime.now())
                .user(userService.getEntityUserById(request.userId())
                )
                .commentParent(commentRepos.findById(request.commentId()).orElse(null))
                .build();

        Comment saved = commentRepos.save(comment);

        return commentMapper.toDTO(saved);
    }
}
