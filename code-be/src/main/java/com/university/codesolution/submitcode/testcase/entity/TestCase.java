package com.university.codesolution.submitcode.testcase.entity;

import com.university.codesolution.submitcode.parameter.entity.Parameter;
import com.university.codesolution.submitcode.problem.entity.Problem;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "test_cases")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class TestCase implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "output_data")
    private String outputData;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "problem_id")
    private Problem problem;

    @OneToMany(mappedBy = "testCase", cascade = CascadeType.ALL)
    private List<Parameter> parameters;
}
