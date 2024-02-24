package com.university.codesolution.contest.request;

import com.university.codesolution.contest.entity.Contest;

import java.time.LocalDateTime;

public record AddContestRequest(
        String title,
        String desc,
        LocalDateTime startTime,
        LocalDateTime endTime,
        Contest.EStatus status,
        Long ownerId
) {}
