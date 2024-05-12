package com.university.codesolution.common.commonresponse;

import java.util.List;

public record ListResponse<T>(
        List<T> list,
        int page,
        int totalPages
) {}
