package com.university.codesolution.comment.mapper;

import com.university.codesolution.comment.dto.CommentDTO;
import com.university.codesolution.comment.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    CommentMapper INSTANCE = Mappers.getMapper(CommentMapper.class);

    CommentDTO toDTO(Comment comment);

    List<CommentDTO> toDTOs(List<Comment> comments);

    @Mapping(target = "problem", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "commentParent", ignore = true)
    Comment toEntity(CommentDTO commentDTO);

    List<Comment> toEntities(List<CommentDTO> commentDTOs);
}
