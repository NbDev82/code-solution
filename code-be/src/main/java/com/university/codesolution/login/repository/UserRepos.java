package com.university.codesolution.login.repository;

import com.university.codesolution.login.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepos extends JpaRepository<User, Long> {
    boolean existsByPhoneNumber(String phoneNumber);
    User findByPhoneNumber(String phoneNumber);
//    Optional<User> findByPhoneNumber(String phoneNumber);
}
