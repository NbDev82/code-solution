package com.university.codesolution.contest.repos;

import com.university.codesolution.contest.entity.Contest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContestRepos extends JpaRepository<Contest, Long> {
    @Query("SELECT c FROM Contest c WHERE c.owner.id = :ownerId AND c.status != 'DELETED'")
    List<Contest> getByOwnerId(@Param("ownerId") Long ownerId, Pageable pageable);
}
