package com.university.codesolution.login.service;

import com.university.codesolution.login.entity.User;


public interface TokenService {
    void addToken(User user, String token);
}
