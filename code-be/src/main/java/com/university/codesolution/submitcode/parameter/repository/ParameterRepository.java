package com.university.codesolution.submitcode.parameter.repository;

import com.university.codesolution.submitcode.parameter.entity.Parameter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParameterRepository extends JpaRepository<Parameter, Long> {
}
