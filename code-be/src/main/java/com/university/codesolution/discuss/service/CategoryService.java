package com.university.codesolution.discuss.service;

import com.university.codesolution.discuss.dto.CategoryDTO;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface CategoryService {
    CategoryDTO createCategory (CategoryDTO categoryDTO);
    CategoryDTO updateCategory (CategoryDTO categoryDTO, Integer categoryId);
    void deleteCategory(Integer categoryId);
    CategoryDTO getCategory(Integer categoryId);
    List<CategoryDTO> getCategories();
}
