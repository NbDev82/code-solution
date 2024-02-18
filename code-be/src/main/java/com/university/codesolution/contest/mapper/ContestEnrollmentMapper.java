package com.university.codesolution.contest.mapper;

import com.university.codesolution.contest.dto.ContestEnrollmentDTO;
import com.university.codesolution.contest.entity.ContestEnrollment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ContestEnrollmentMapper {

    ContestEnrollmentMapper INSTANCE = Mappers.getMapper(ContestEnrollmentMapper.class);

    @Mapping(target = "contest", source = "contest")
    @Mapping(target = "user", source = "user")
    @Mapping(target = "contestId", source = "contest.id")
    @Mapping(target = "userId", source = "user.id")
    ContestEnrollmentDTO toDTO(ContestEnrollment entity);

    List<ContestEnrollmentDTO> toDTOs(List<ContestEnrollment> entity);

    @Mapping(target = "contest", source = "contest")
    @Mapping(target = "user", source = "user")
    ContestEnrollment toEntity(ContestEnrollmentDTO dto);

    List<ContestEnrollment> toEntities(List<ContestEnrollmentDTO> dto);
}
