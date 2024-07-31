package com.university.codesolution.discuss.service;

import com.university.codesolution.discuss.dto.CategoryDTO;
import com.university.codesolution.discuss.entity.Category;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface CategoryService {
    Category createCategory (CategoryDTO categoryDTO);
    CategoryDTO updateCategory (CategoryDTO categoryDTO, Integer categoryId);
    void deleteCategory(Integer categoryId);
    Category getCategory(Integer categoryId);
    List<Category> getCategories();
}
