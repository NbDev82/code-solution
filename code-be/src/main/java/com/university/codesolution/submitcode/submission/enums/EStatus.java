package com.university.codesolution.submitcode.submission.enums;

public enum EStatus {
    ACCEPTED(0),
    WRONG_ANSWER(1),
    COMPILE_ERROR(2),
    TIME_LIMIT_EXCEEDED(3);
    private final int value;
    EStatus(int value) {
        this.value = value;
    }
}
