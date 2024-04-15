package com.university.codesolution.discuss.mapper;

import com.university.codesolution.discuss.dto.CategoryDTO;
import com.university.codesolution.discuss.dto.DiscussDTO;
import com.university.codesolution.discuss.entity.Category;
import com.university.codesolution.discuss.entity.Discuss;
import com.university.codesolution.login.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.mapstruct.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

@Mapper
@AllArgsConstructor
@NoArgsConstructor
public class CategoryMapper {
    @Autowired
    private ModelMapper modelMapper;
    public CategoryDTO toDto(Category category){
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setCategoryId(category.getId());
        categoryDTO.setCategoryTitle(category.getCategoryTitle());
        categoryDTO.setCategoryDescription(category.getCategoryDescription());
    return categoryDTO;
    }
    public List<CategoryDTO> dtos(List<Category> categories) {
        return categories.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

}
