package com.university.codesolution.comment.mapper;

import com.university.codesolution.comment.dto.CommentDTO;
import com.university.codesolution.comment.entity.Comment;
import com.university.codesolution.comment.entity.Emoji;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    CommentMapper INSTANCE = Mappers.getMapper(CommentMapper.class);

    @Mapping(target = "userName", expression = "java(comment.getUser().getFullName())")
    @Mapping(target = "emoji", expression = "java(defaultEmoji())")
    @Mapping(target = "ownerId", expression = "java(comment.getUser().getId())")
    @Mapping(target = "emojiQuantity", expression = "java(defaultEmojiQuantity())")
    @Mapping(target = "replyComments", expression = "java(defaultReplyComments())")
    CommentDTO toDTO(Comment comment);

    @Mapping(target = "updatedAt", expression = "java(formatUpdateAt(updateAt))")
    List<CommentDTO> toDTOs(List<Comment> comments);

    @Mapping(target = "discuss", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "commentParent", ignore = true)
    Comment toEntity(CommentDTO commentDTO);

    List<Comment> toEntities(List<CommentDTO> commentDTOs);

    default String formatUpdateAt(LocalDateTime updateAt) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd'th'MM HH:mm");
        return updateAt.format(formatter);
    }

    default Emoji defaultEmoji() {
        return new Emoji("❤","Love");
    }

    default List<CommentDTO> defaultReplyComments() {
        return new ArrayList<>();
    }

    default int defaultEmojiQuantity() {
        return 0;
    }
}
