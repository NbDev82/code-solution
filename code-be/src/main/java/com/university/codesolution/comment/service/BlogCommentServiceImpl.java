package com.university.codesolution.comment.service;

import com.university.codesolution.comment.dto.CommentDTO;
import com.university.codesolution.comment.entity.Comment;
import com.university.codesolution.comment.exception.CommentNotFoundException;
import com.university.codesolution.comment.mapper.CommentMapper;
import com.university.codesolution.comment.repos.CommentRepository;
import com.university.codesolution.discuss.entity.Discuss;
import com.university.codesolution.discuss.exception.ResourceNotFoundException;
import com.university.codesolution.discuss.repository.DiscussRepos;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class BlogCommentServiceImpl implements BlogCommentService{
    private DiscussRepos discussRepos;
    private CommentMapper commentMapper;
    private CommentRepository commentRepository;

    @Override
    public CommentDTO createComment(CommentDTO commentDTO, Long discussId) {
        Discuss discuss = this.discussRepos.findById(discussId)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Discuss: %s", discussId)));
        Comment comment = this.commentMapper.toEntity(commentDTO);
        comment.setDiscuss(discuss);
        Comment savedComment = this.commentRepository.save(comment);
        return this.commentMapper.toDTO(savedComment);

    }

    @Override
    public void deleteCommentById(Long commentId) {
        this.commentRepository.deleteById(commentId);
    }
}
