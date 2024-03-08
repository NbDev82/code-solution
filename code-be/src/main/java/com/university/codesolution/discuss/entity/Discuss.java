package com.university.codesolution.discuss.entity;

import com.university.codesolution.comment.entity.Comment;
import com.university.codesolution.login.entity.User;
import com.university.codesolution.submitcode.problem.entity.Problem;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "discusses")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Discuss implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 100 , nullable = false)
    private String topic;
    @Column(length = 10000)
    private String content;
    private String description;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;


    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User owner;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "problem_id")
    private Problem problem;

    @OneToMany(mappedBy = "discuss",fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Comment> comments;
}
