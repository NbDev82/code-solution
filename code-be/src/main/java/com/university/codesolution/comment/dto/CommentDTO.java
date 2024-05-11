package com.university.codesolution.comment.dto;

import com.university.codesolution.comment.entity.Emoji;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CommentDTO {
    private Long id;
    private String text;
    private String updatedAt;
    private String userName;
    private Long ownerId;
    private Emoji emoji;
    private int replyQuantity;
    private int emojiQuantity;

    private List<CommentDTO> replyComments;
}
