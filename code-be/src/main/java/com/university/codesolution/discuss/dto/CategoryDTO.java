package com.university.codesolution.discuss.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CategoryDTO {
    private Integer categoryId;
    private String categoryTitle;
    private String categoryDescription;
}
