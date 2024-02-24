package com.university.codesolution.login.entity;

import com.university.codesolution.comment.entity.Comment;
import com.university.codesolution.contest.entity.Contest;
import com.university.codesolution.contest.entity.ContestEnrollment;
import com.university.codesolution.discuss.entity.Discuss;
import com.university.codesolution.login.enums.ERole;
import com.university.codesolution.notification.entity.Notification;
import com.university.codesolution.submitcode.entity.Submission;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class User implements Serializable {
    @Id
    private Long id;

    private String name;

    private LocalDateTime dateOfBirth;

    private String email;

    private String password;

    private double cummulativeScore;

    private LocalDateTime addedAt;

    private LocalDateTime updatedAt;

    private boolean isActive;

    private ERole role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<ContestEnrollment> contestEnrollments;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<Contest> contests;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Token> tokens;

    @OneToMany(mappedBy = "recipient", cascade = CascadeType.ALL)
    private List<Notification> notifications;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Comment> comments;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Submission> submissions;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<Discuss> discusses;
}
