package com.university.codesolution.discuss.mapper;
import com.university.codesolution.discuss.dto.CategoryDTO;
import com.university.codesolution.discuss.dto.DiscussDTO;
import com.university.codesolution.discuss.entity.Category;
import com.university.codesolution.discuss.entity.Discuss;
import com.university.codesolution.login.dto.UserDTO;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Component
public class DiscussMapper {
    @Autowired
    private final ModelMapper modelMapper ;

    @Autowired
    public DiscussMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
        configureModelMapper();
    }

    private void configureModelMapper() {
        Converter<Category, CategoryDTO> categoryConverter = new Converter<>() {
            @Override
            public CategoryDTO convert(MappingContext<Category, CategoryDTO> context) {
                Category source = context.getSource();
                CategoryDTO destination = new CategoryDTO();
                destination.setCategoryId(source.getId());
                // Set other properties as needed
                return destination;
            }
        };
        modelMapper.createTypeMap(Category.class, CategoryDTO.class)
                .setConverter(categoryConverter);
    }
    public DiscussDTO toDto(Discuss discuss) {
        UserDTO userDTO = modelMapper.map(discuss.getOwner(), UserDTO.class);
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setCategoryId(discuss.getCategory().getId());
        categoryDTO.setCategoryTitle(discuss.getCategory().getCategoryTitle());
        categoryDTO.setCategoryDescription(discuss.getCategory().getCategoryDescription());
        DiscussDTO discussDTO = new DiscussDTO();
        discussDTO.setId(discuss.getId());
        discussDTO.setTopic(discuss.getTopic());
        discussDTO.setContent(discuss.getContent());
        discussDTO.setUser(userDTO);
        discussDTO.setCategory(categoryDTO);
        discussDTO.setStartDate(discuss.getStartDate());
        if(discuss.getImage() == null)
            discussDTO.setImage("null");
        return discussDTO;
    }

    public List<DiscussDTO> dtos(List<Discuss> discusses) {
        return discusses.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
}