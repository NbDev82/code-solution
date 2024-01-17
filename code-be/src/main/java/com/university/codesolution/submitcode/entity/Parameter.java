package com.university.codesolution.submitcode.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Table(name = "submissions")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Parameter implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @Column(name = "input_datatype")
    private String inputDataType;

    @Column(name = "input_data")
    private String inputData;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "test_case_id")
    private TestCase testCase;
}
