package com.university.codesolution.discuss.entity;

import com.university.codesolution.comment.entity.Comment;
import com.university.codesolution.login.entity.User;
import com.university.codesolution.submitcode.problem.entity.Problem;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Setter
@Getter
@Table(name = "discusses")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Discuss implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100 , nullable = false)
    private String topic;

    @Column(length = 100000000 )
    private String content;

    private String description;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    private String image;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User owner;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "problem_id")
    private Problem problem;

    @OneToMany(mappedBy = "discuss", fetch = FetchType.EAGER)
    private List<Comment> comments;


}
