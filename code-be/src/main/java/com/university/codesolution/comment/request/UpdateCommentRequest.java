package com.university.codesolution.comment.request;

public record UpdateCommentRequest(
     Long commentId,
     String text
) {}
