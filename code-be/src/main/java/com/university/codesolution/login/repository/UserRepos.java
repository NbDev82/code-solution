package com.university.codesolution.login.repository;

import com.university.codesolution.login.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepos extends JpaRepository<User, Long> {
    boolean existsByPhoneNumber(String phoneNumber);
    User findByPhoneNumber(String phoneNumber);

//    Optional<User> findByPhoneNumber(String phoneNumber);

    @Query(value = "SELECT u FROM User u WHERE u.isActive = true AND u.id != :curUserId")
    List<User> getUsersExcludingCurrentUser(Long curUserId, Pageable pageable);

    @Query(value = "SELECT u FROM User u " +
            "WHERE u.isActive = true AND u.id != :curUserId AND u.fullName LIKE %:fullName%")
    List<User> getUsersByNameExcludingCurrentUser(
            @Param("fullName") String fullName,
            @Param("curUserId") Long curUserId,
            Pageable pageable);
}
