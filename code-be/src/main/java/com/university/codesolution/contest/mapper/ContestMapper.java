package com.university.codesolution.contest.mapper;

import com.university.codesolution.contest.dto.ContestDTO;
import com.university.codesolution.contest.entity.Contest;
import com.university.codesolution.login.dto.UserDTO;
import com.university.codesolution.login.entity.User;
import com.university.codesolution.login.mapper.UserMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ContestMapper {
    ContestMapper INSTANCE = Mappers.getMapper(ContestMapper.class);

    @Mapping(target = "ownerId", source = "owner.id")
    @Mapping(target = "owner", source = "owner", qualifiedByName = "userToUserDTO")
    ContestDTO toDTO(Contest entity);

    @Named("userToUserDTO")
    default UserDTO userToUserDTO(User entity) {
        return UserMapper.INSTANCE.toDTO(entity);
    }

    List<ContestDTO> toDTOs(List<Contest> entity);

    @Mapping(target = "owner", source = "owner", qualifiedByName = "userDTOToUser")
    @Mapping(target = "isDeleted", ignore = true)
    @Mapping(target = "problems", ignore = true)
    @Mapping(target = "contestEnrollments", ignore = true)
    Contest toEntity(ContestDTO dto);

    @Named("userDTOToUser")
    default User userDTOToUser(UserDTO dto) {
        return UserMapper.INSTANCE.toEntity(dto);
    }

    List<Contest> toEntities(List<ContestDTO> dto);
}
