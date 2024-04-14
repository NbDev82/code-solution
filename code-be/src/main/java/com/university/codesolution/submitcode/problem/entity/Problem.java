package com.university.codesolution.submitcode.problem.entity;

import com.university.codesolution.comment.entity.Comment;
import com.university.codesolution.contest.entity.Contest;
import com.university.codesolution.submitcode.library.entity.LibrariesSupport;
import com.university.codesolution.submitcode.submission.entity.Submission;
import com.university.codesolution.submitcode.testcase.entity.TestCase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "problems")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Problem implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(columnDefinition = "text")
    private String description;

    @Column(name = "added_at")
    private LocalDateTime addedAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "function_name")
    private String functionName;

    @Column(name = "output_datatype")
    private String outputDataType;

    private double point;

    @Enumerated(EnumType.STRING)
    private EDifficultyLevel difficultyLevel;

    @Column(name = "is_deleted")
    private boolean isDeleted;

    @Enumerated(EnumType.STRING)
    @ElementCollection(targetClass = ETopic.class)
    private List<ETopic> topics;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "contest_id")
    private Contest contest;

    @OneToMany(mappedBy = "problem", cascade = CascadeType.ALL)
    private List<LibrariesSupport> librariesSupports;

    @OneToMany(mappedBy = "problem", cascade = CascadeType.ALL)
    private List<TestCase> testCases;

    @OneToMany(mappedBy = "problem", cascade = CascadeType.ALL)
    private List<Comment> comments;

    @OneToMany(mappedBy = "problem", cascade = CascadeType.ALL)
    private List<Submission> submissions;

    public enum EDifficultyLevel {
        EASY, NORMAL, HARD;
    }

    public enum ETopic {
        STRING,
        ARRAY,
        SORTING,
        MATH,
        COUNTING,
        SEARCH,
        RECURSION,
        REGEX,
        STACK,
        GEOMETRY,
        DATA_STRUCTURE,
        LOOPING;
    }
}
