package com.university.codesolution.submitcode.problem.repository;

import com.university.codesolution.submitcode.problem.entity.Problem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProblemRepository extends JpaRepository<Problem, Long> {
    Optional<Problem> findByName(String problemName);
}
