package com.university.codesolution.login.service;

import com.university.codesolution.login.entity.Token;
import com.university.codesolution.login.entity.User;
import com.university.codesolution.login.repository.TokenRepos;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService {
    private static final int MAX_TOKENS = 3;
    @Value("2592000")
    private int expiration;
    private final TokenRepos tokenRepos;
    @Transactional
    @Override
    public void addToken(User user, String token){
        List<Token> userTokens=tokenRepos.findByUser(user);
        int tokenCount = userTokens.size();
        Token tokenToDelete;

        if(tokenCount>MAX_TOKENS){
            tokenToDelete=userTokens.get(0);
            tokenRepos.delete(tokenToDelete);

        }
        long expirationInSeconds=expiration;
        LocalDateTime expirationDateTime = LocalDateTime.now().plusSeconds(expiration);
        Token newToken=Token.builder()
                .user(user)
                .token(token)
                .expired(false)
                .tokenType("Bearer")
                .expirationDate(expirationDateTime)
                .build();
        tokenRepos.save(newToken);
    }
}
