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
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class BlogCommentServiceImpl implements BlogCommentService{
    private DiscussRepos discussRepos;
    private BlogCommentMapper blogcommentMapper;
    private CommentRepository commentRepository;

    @Override
    public Comment createComment(BlogCommentDTO blogCommentDTO, Long discussId) {
        Discuss discuss = this.discussRepos.findById(discussId)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Discuss: %s", discussId)));
        Comment commentChild = new Comment();

        if(blogCommentDTO.getCommentParent()!=null)
        {
        Comment commentParent = this.commentRepository.findById(blogCommentDTO.getCommentParent().getId())
                .orElseThrow(()->new ResourceNotFoundException(String.format("Parent: %s", blogCommentDTO.getCommentParent())));
        commentChild.setCommentParent(commentParent);

        }
        commentChild.setDiscuss(discuss);
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
