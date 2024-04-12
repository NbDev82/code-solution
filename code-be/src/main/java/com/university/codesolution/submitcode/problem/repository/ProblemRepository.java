package com.university.codesolution.submitcode.problem.repository;

import com.university.codesolution.search.enums.EStatus;
import com.university.codesolution.submitcode.problem.entity.Problem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProblemRepository extends JpaRepository<Problem, Long> {
    Optional<Problem> findByName(String problemName);

    @Query("SELECT p " +
            "FROM Problem p " +
            "WHERE ( :difficulty IS NULL OR p.difficultyLevel = :difficulty ) ")
    Page<Problem> findByCriteria(Problem.EDifficultyLevel difficulty, Pageable pageable);


}
