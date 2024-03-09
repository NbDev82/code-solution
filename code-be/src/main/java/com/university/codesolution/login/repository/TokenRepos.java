package com.university.codesolution.login.repository;

import com.university.codesolution.login.entity.Token;
import com.university.codesolution.login.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TokenRepos extends JpaRepository<Token,Long> {
    List<Token> findByUser(User user);
    Token findByToken(String token);
}
