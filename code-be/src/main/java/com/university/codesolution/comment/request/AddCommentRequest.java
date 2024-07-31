package com.university.codesolution.comment.request;

public record AddCommentRequest(
        String text,
        Long userId,
        Long problemId
) {}
