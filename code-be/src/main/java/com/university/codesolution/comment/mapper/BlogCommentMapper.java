package com.university.codesolution.comment.mapper;

import com.university.codesolution.comment.dto.BlogCommentDTO;
import com.university.codesolution.comment.entity.Comment;
import com.university.codesolution.login.dto.UserDTO;
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


        return childComment;
    }
    public BlogCommentDTO setComment(Comment comment) {
        BlogCommentDTO blogCommentDTO = new BlogCommentDTO();

        if (comment.getUser() == null) {
            // Assign default values for user-related fields
            UserDTO defaultUserDTO = new UserDTO();
            defaultUserDTO.setId(0L); // Assign a default user ID
            defaultUserDTO.setFullName("User"); // Assign a default user name
            blogCommentDTO.setUser(defaultUserDTO);
        } else {
            UserDTO userDTO = modelMapper.map(comment.getUser(), UserDTO.class);
            blogCommentDTO.setUser(userDTO);
        }

        blogCommentDTO.setId(comment.getId());
        blogCommentDTO.setText(comment.getText());
        blogCommentDTO.setUpdatedAt(comment.getUpdatedAt());

        if (comment.getCommentParent() != null) {
            Comment commentParent = comment.getCommentParent();
            blogCommentDTO.setCommentParent(commentParent.getId());
        }

        return blogCommentDTO;
    }

    public List<BlogCommentDTO> dtos(List<Comment> comments){
        return comments.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

}
