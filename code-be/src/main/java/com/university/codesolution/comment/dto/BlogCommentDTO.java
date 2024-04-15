package com.university.codesolution.comment.dto;

import com.university.codesolution.comment.entity.Comment;
import com.university.codesolution.comment.mapper.BlogCommentMapper;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class BlogCommentDTO {
    private Long id;
    private String text;
    private BlogCommentDTO commentParent = null;

}
