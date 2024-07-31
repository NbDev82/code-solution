package com.university.codesolution.submitcode.library.repository;

import com.university.codesolution.submitcode.library.entity.LibrariesSupport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LibraryRepository extends JpaRepository<LibrariesSupport, Long> {
}
