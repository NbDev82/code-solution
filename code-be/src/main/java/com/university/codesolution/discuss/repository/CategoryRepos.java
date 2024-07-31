package com.university.codesolution.discuss.repository;

import com.university.codesolution.discuss.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepos extends JpaRepository<Category, Integer> {

}
