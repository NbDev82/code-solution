package com.university.codesolution.submitcode.exception;

import com.university.codesolution.submitcode.submission.enums.ELanguage;

public class UnsupportedLanguageException extends RuntimeException{
    public UnsupportedLanguageException(String message) {
        super("Language is not supported: " + message);
    }
}
