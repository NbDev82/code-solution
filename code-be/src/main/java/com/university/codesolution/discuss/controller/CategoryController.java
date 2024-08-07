package com.university.codesolution.discuss.controller;

import com.university.codesolution.discuss.dto.CategoryDTO;
import com.university.codesolution.discuss.entity.Category;
import com.university.codesolution.discuss.mapper.CategoryMapper;
import com.university.codesolution.discuss.service.CategoryService;
import io.swagger.v3.oas.models.responses.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/categories")
@AllArgsConstructor

public class CategoryController {

    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;
    @PostMapping("/")
    public ResponseEntity<CategoryDTO> createCategory(
            @RequestBody CategoryDTO categoryDTO) {
        Category createCategory = this.categoryService.createCategory(categoryDTO);
        CategoryDTO cat = this.categoryMapper.toDto(createCategory);
        return new ResponseEntity<CategoryDTO>(cat, HttpStatus.CREATED);
    }

    @PutMapping("/{catId}")
    public ResponseEntity<CategoryDTO> updateCategory(
            @RequestBody CategoryDTO categoryDTO,
            @PathVariable Integer catId) {
        CategoryDTO updateCategory = this.categoryService.updateCategory(categoryDTO,catId);
        return new ResponseEntity<CategoryDTO>(updateCategory, HttpStatus.OK);

    }

    @DeleteMapping("/{catId}")
    public ResponseEntity<ApiResponse> deleteCategory(
            @PathVariable Integer catId) {
        this.categoryService.deleteCategory(catId);
        return new ResponseEntity<ApiResponse>(new ApiResponse().description("Category deleted is successfully"), HttpStatus.OK);
    }
    @GetMapping("/{catId}")
    public ResponseEntity<CategoryDTO> getCategory(
            @PathVariable Integer catId) {
        Category category = this.categoryService.getCategory(catId);
        return new ResponseEntity<CategoryDTO>(this.categoryMapper.toDto(category), HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<List<CategoryDTO>> getCategories() {
        List<Category> categories = this.categoryService.getCategories();
        List<CategoryDTO> categoryDTOS = this.categoryMapper.dtos(categories);
        return ResponseEntity.ok(categoryDTOS);
    }

}
