package com.university.codesolution.discuss.service;

import com.university.codesolution.discuss.dto.CategoryDTO;
import com.university.codesolution.discuss.entity.Category;
import com.university.codesolution.discuss.exception.ResourceNotFoundException;
import com.university.codesolution.discuss.repository.CategoryRepos;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor

public class CategoryServiceImpl implements CategoryService{
    private final CategoryRepos categoryRepos;
    private ModelMapper modelMapper;


    @Override
    public Category createCategory(CategoryDTO categoryDTO) {
        Category cat = this.modelMapper.map(categoryDTO, Category.class);
        Category addedCat = this.categoryRepos.save(cat);
        return addedCat;
    }

    @Override
    public CategoryDTO updateCategory(CategoryDTO categoryDTO, Integer categoryId) {
        Category cat =this.categoryRepos.findById(categoryId)
                .orElseThrow(()->new ResourceNotFoundException("CategoryId"));
        cat.setCategoryTitle(categoryDTO.getCategoryTitle());
        cat.setCategoryDescription(categoryDTO.getCategoryDescription());
        Category updateCat = this.categoryRepos.save(cat);
        return this.modelMapper.map(updateCat, CategoryDTO.class);
    }

    @Override
    public void deleteCategory(Integer categoryId) {
        Category cat = this.categoryRepos.findById(categoryId)
                .orElseThrow(()->new ResourceNotFoundException("CategoryId"));
        this.categoryRepos.delete(cat);
    }

    @Override
    public Category getCategory(Integer categoryId) {
        Category category = this.categoryRepos.findById(categoryId)
                .orElseThrow(()->new ResourceNotFoundException("CategoryId"));
        return category;
    }

    @Override
    public List<Category> getCategories() {
        List<Category> categories = this.categoryRepos.findAll();

        return categories;
    }
}
