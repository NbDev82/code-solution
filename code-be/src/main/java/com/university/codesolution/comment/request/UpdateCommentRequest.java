package com.university.codesolution.comment.request;

import java.time.LocalDateTime;

public record UpdateCommentRequest(
     Long commentId,
     String text,
     LocalDateTime updatedAt
) {}
