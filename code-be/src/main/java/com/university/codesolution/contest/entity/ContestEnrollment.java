package com.university.codesolution.contest.entity;

import com.university.codesolution.login.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Table(name = "contest_enrollments")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ContestEnrollment implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double score;

    @Column(name = "accepted_submission")
    private boolean acceptedSubmission;

    @Enumerated(EnumType.STRING)
    private EType type;

    @Enumerated(EnumType.STRING)
    private EStatus status;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "contest_id")
    private Contest contest;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    public enum EType {
        REQUESTED_INVITE, DIRECT_JOIN
    }

    public enum EStatus {
        PENDING_APPROVAL, ACCEPTED, DENIED, EXPIRED
    }
}
