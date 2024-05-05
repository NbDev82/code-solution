package com.university.codesolution.comment.request;


public record ReplyCommentRequest(
        String text,
        Long userId,
        Long commentId
) {}
