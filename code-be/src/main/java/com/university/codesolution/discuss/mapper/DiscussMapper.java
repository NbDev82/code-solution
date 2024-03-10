package com.university.codesolution.discuss.mapper;

import com.university.codesolution.discuss.dto.DiscussDTO;
import com.university.codesolution.discuss.entity.Discuss;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DiscussMapper {
    DiscussMapper INSTANCE = Mappers.getMapper(DiscussMapper.class);

    DiscussDTO toDto(Discuss discuss);

    List<DiscussDTO> toDtos(List<Discuss> discusses);

    @Mapping(target = "comments", ignore = true)
    Discuss toEntity(DiscussDTO discussDto);

    List<Discuss> toEntities(List<DiscussDTO> discussDtos);
}