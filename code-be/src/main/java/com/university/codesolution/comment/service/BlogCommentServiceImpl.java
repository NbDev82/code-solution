package com.university.codesolution.comment.service;

import com.university.codesolution.comment.dto.BlogCommentDTO;
import com.university.codesolution.comment.dto.CommentDTO;
import com.university.codesolution.comment.entity.Comment;
import com.university.codesolution.comment.exception.CommentNotFoundException;
import com.university.codesolution.comment.mapper.BlogCommentMapper;
import com.university.codesolution.comment.mapper.CommentMapper;
import com.university.codesolution.comment.repos.CommentRepository;
import com.university.codesolution.discuss.entity.Discuss;
import com.university.codesolution.discuss.exception.ResourceNotFoundException;
import com.university.codesolution.discuss.repository.DiscussRepos;
import com.university.codesolution.login.entity.User;
import com.university.codesolution.login.repository.UserRepos;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class BlogCommentServiceImpl implements BlogCommentService{
    private DiscussRepos discussRepos;
    private BlogCommentMapper blogcommentMapper;
    private CommentRepository commentRepository;
    private UserRepos userRepos;
    @Override
    public Comment createComment(BlogCommentDTO blogCommentDTO, Long discussId, Long userId) {
        Discuss discuss = this.discussRepos.findById(discussId)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Discuss: %s", discussId)));
        User user = this.userRepos.findById(userId)
                .orElseThrow(()->new ResourceNotFoundException("Cannot find User with id : "+userId));
        Comment commentChild = new Comment();
        commentChild.setUpdatedAt(LocalDateTime.now());

        if (blogCommentDTO.getCommentParent() != null && !blogCommentDTO.getCommentParent().equals(0L))
        {
        Comment commentParent = this.commentRepository.findById(blogCommentDTO.getCommentParent())
                .orElseThrow(()->new ResourceNotFoundException(String.format("Parent: %s", blogCommentDTO.getCommentParent())));
        commentChild.setCommentParent(commentParent);

        }
        commentChild.setDiscuss(discuss);
        commentChild.setUser(user);
        commentChild.setText(blogCommentDTO.getText());


        return this.commentRepository.save(commentChild);


    }



    @Override
    public List<Comment> getCommentByDiscuss(Long discussId) {
        List<Comment> comments = this.commentRepository.findByDiscussId(discussId);
        List<Comment> commentNotParent = new ArrayList<>();
        for(Comment comment:comments){
            if(comment.getCommentParent() == null)
                commentNotParent.add(comment);
        }
        return commentNotParent;

    }

    @Override
    public Comment getCommentById(Long commentId) {
        Comment comment = this.commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Comment: %s", commentId)));

        return comment;
    }

    @Override
    public List<Comment> getAllCommentsByParentId(Long parentId) {
        return commentRepository.findByCommentParent_Id(parentId);
    }


    @Override
    public void deleteCommentById(Long commentId) {
        this.commentRepository.deleteById(commentId);
    }
}
