package com.university.codesolution.discuss.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "discuss_category")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class DiscussCategory implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;

    private String description;

    @OneToMany(mappedBy = "category",fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Discuss> discusses;
}
