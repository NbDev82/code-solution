package com.university.codesolution.login.mapper;

import com.university.codesolution.login.dto.UserDTO;
import com.university.codesolution.login.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserDTO toDTO(User user);

    List<UserDTO> toDTOs(List<User> users);

    @Mapping(target = "isActive", ignore = true)
    @Mapping(target = "contestEnrollments", ignore = true)
    @Mapping(target = "contests", ignore = true)
    @Mapping(target = "tokens", ignore = true)
    @Mapping(target = "notifications", ignore = true)
    @Mapping(target = "comments", ignore = true)
    @Mapping(target = "submissions", ignore = true)
    @Mapping(target = "urlImage", source = "urlImage")
    User toEntity(UserDTO userDTO);

    List<User> toEntities(List<UserDTO> userDTOs);
}
