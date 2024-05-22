package com.university.codesolution.contest.repos;

import com.university.codesolution.contest.entity.ContestEnrollment;
import com.university.codesolution.login.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContestEnrollmentRepos extends JpaRepository<ContestEnrollment, Long> {
    @Query("SELECT ce FROM ContestEnrollment ce WHERE ce.contest.id = :contestId")
    List<ContestEnrollment> getByContestId(@Param("contestId") Long contestId, Pageable pageable);

    Optional<ContestEnrollment> findByContestIdAndUserId(Long contestId, Long userId);

    @Query("SELECT u FROM User u WHERE u.id IN (SELECT ce.user.id FROM ContestEnrollment ce " +
            "WHERE ce.contest.id = :contestId AND ce.status = 'ACCEPTED')")
    List<User> getParticipantsByContest(@Param("contestId") Long contestId);
}
