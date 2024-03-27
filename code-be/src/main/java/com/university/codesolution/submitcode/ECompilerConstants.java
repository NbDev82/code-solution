package com.university.codesolution.submitcode;

public enum ECompilerConstants {
    SUCCESS(0),
    ERROR(1),
    SYNTAX_ERROR(2),
    CLASS_NOT_FOUND(3),
    TYPE_NOT_PRESENT(4),
    COMPILER_NOT_FOUND(5),
    COMPILATION_ERROR(6),
    COMPILATION_FAILED(7);
    private final int value;
    ECompilerConstants(int value) {
        this.value = value;
    }
}
