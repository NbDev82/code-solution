package com.university.codesolution.discuss.repository;

import com.university.codesolution.discuss.entity.Category;
import com.university.codesolution.discuss.entity.Discuss;
import com.university.codesolution.login.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiscussRepos extends JpaRepository<Discuss,Long> {
    List<Discuss> findByOwner(User owner);
    List<Discuss> findByCategory(Category category);
    List<Discuss> findByTopicContaining(String topic);
    Page<Discuss> findAll(Pageable p);
}
