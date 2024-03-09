package com.university.codesolution.login.service;

import com.university.codesolution.login.entity.User;
import org.springframework.stereotype.Service;

@Service
public interface TokenService {
    void addToken(User user, String token);
}
