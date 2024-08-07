package com.university.codesolution.contest.repos;

import com.university.codesolution.contest.entity.Contest;
import com.university.codesolution.submitcode.problem.entity.Problem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContestRepos extends JpaRepository<Contest, Long> {
    @Query("SELECT c FROM Contest c WHERE c.isDeleted = false AND c.owner.id = :ownerId ")
    Page<Contest> getByOwnerId(@Param("ownerId") Long ownerId, Pageable pageable);

    @Query("SELECT c FROM Contest c WHERE c.isDeleted = false AND c.owner.id != :userId")
    List<Contest> getGlobalContests(@Param("userId") Long userId, Pageable pageable);

    @Query("SELECT c FROM Contest c WHERE c.isDeleted = false AND c.owner.id = :userId AND c.title LIKE %:title%")
    List<Contest> getMyContestsByTitle(@Param("userId") Long userId,
                                       @Param("title") String title,
                                       Pageable pageable);

    @Query("SELECT c.problems FROM Contest c WHERE c.id = :contestId")
    List<Problem> getProblemsByContest(@Param("contestId") Long contestId);
}
