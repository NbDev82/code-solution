package com.university.codesolution.common.service;

public interface EmailService {
    void sendHtmlContent(String toEmail, String subject, String htmlBody);
}
