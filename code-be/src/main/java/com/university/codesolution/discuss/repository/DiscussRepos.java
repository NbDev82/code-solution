package com.university.codesolution.discuss.repository;

import com.university.codesolution.discuss.entity.Category;
import com.university.codesolution.discuss.entity.Discuss;
import com.university.codesolution.login.entity.User;
import org.hibernate.type.descriptor.converter.spi.JpaAttributeConverter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiscussRepos extends JpaRepository<Discuss,Long> {
    List<Discuss> findByUser(User user);
    List<Discuss> findByCategory(Category category);
}
