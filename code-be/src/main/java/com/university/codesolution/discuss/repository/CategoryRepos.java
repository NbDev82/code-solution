package com.university.codesolution.discuss.repository;

import com.university.codesolution.discuss.entity.Category;
import com.university.codesolution.discuss.entity.Discuss;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepos extends JpaRepository<Category, Integer> {

}
