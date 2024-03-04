package com.university.codesolution.submitcode.problem.mapper;

import com.university.codesolution.submitcode.DTO.ProblemDTO;
import com.university.codesolution.submitcode.problem.entity.Problem;
import com.university.codesolution.submitcode.submission.enums.EStatus;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProblemMapper {
    ProblemMapper INSTANCE = Mappers.getMapper(ProblemMapper.class);

    @Mapping(target = "submissionCount",
            expression = "java(problem.getSubmissions() != null ? problem.getSubmissions().size() : 0)")
    @Mapping(target = "discussCount",
            expression = "java(problem.getDiscusses() != null ? problem.getDiscusses().size() : 0)")
    @Mapping(target = "acceptedCount",
            expression = "java(countAccepted(problem))")
    ProblemDTO toDTO(Problem problem);

    List<ProblemDTO> toDTOs(List<Problem> problems);

    @Mapping(target = "librariesSupports", ignore = true)
    @Mapping(target = "testCases", ignore = true)
    @Mapping(target = "functionName", ignore = true)
    @Mapping(target = "outputDataType", ignore = true)
    Problem toEntity(ProblemDTO problemDTO);

    List<Problem> toEntities(List<ProblemDTO> problemDTOs);

    default int countAccepted(Problem problem) {
        return problem.getSubmissions() != null ? (int) problem.getSubmissions().stream().filter(s -> s.getStatus().equals(EStatus.ACCEPTED)).count() : 0;
    }
}
