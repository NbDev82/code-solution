package com.university.codesolution.login.customenum;

public enum ERole {
    USER(0),
    ADMIN(1);
    private final int value;
    ERole(int value) {
        this.value = value;
    }
}
