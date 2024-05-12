package com.university.codesolution.comment.repos;

import com.university.codesolution.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByDiscussId(Long discussId);
    List<Comment> findByCommentParent_Id(Long parentId);

    @Query("SELECT c " +
            "FROM Comment c " +
            "WHERE c.problem.id = :problemId AND c.isDeleted = false")
    List<Comment> findByProblemId(Long problemId);

    @Query("SELECT c " +
            "FROM Comment c " +
            "WHERE c.commentParent.id = :parentId AND c.isDeleted = false")
    List<Comment> findByCommentId(Long parentId);
}
