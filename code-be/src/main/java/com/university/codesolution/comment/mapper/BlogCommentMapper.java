package com.university.codesolution.comment.mapper;

import com.university.codesolution.comment.dto.BlogCommentDTO;
import com.university.codesolution.comment.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.mapstruct.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

@Mapper
@AllArgsConstructor
@NoArgsConstructor
public class BlogCommentMapper {
    @Autowired
    private ModelMapper modelMapper;


    public BlogCommentDTO toDto(Comment comment) {
        BlogCommentDTO childComment = this.setComment(comment);
        Comment commentParent = comment.getCommentParent();
        if(commentParent!=null) {
            childComment.setCommentParent(this.setComment(commentParent));
        }
        return childComment;
    }
    public BlogCommentDTO setComment(Comment comment){
        BlogCommentDTO blogCommentDTO = new BlogCommentDTO();
        blogCommentDTO.setId(comment.getId());

        blogCommentDTO.setText(comment.getText());

        if(comment.getCommentParent()!=null) {
            Comment commentParent = comment.getCommentParent();
            commentParent.setUser(null);
            commentParent.setDiscuss(null);
            blogCommentDTO.setCommentParent(null);
        }
        return blogCommentDTO;
    }

    public List<BlogCommentDTO> dtos(List<Comment> comments){
        return comments.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

}
