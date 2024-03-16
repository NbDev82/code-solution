package com.university.codesolution.discuss.mapper;

import com.university.codesolution.discuss.dto.CategoryDTO;
import com.university.codesolution.discuss.dto.DiscussDTO;
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
public class DiscussMapper {

    @Autowired
    private ModelMapper modelMapper;

    public DiscussDTO toDto(Discuss discuss) {
        UserDTO userDTO = modelMapper.map(discuss.getOwner(), UserDTO.class);
        CategoryDTO categoryDTO = modelMapper.map(discuss.getCategory(), CategoryDTO.class);
        DiscussDTO discussDTO = modelMapper.map(discuss, DiscussDTO.class);
        discussDTO.setUser(userDTO);
        discussDTO.setCategory(categoryDTO);
        return discussDTO;
    }

    public List<DiscussDTO> dtos(List<Discuss> discusses) {
        return discusses.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
}