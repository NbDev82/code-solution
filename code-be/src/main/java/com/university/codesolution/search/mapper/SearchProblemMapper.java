package com.university.codesolution.search.mapper;

import com.university.codesolution.search.dto.ProblemDTO;
import com.university.codesolution.search.enums.EStatus;
import com.university.codesolution.submitcode.problem.entity.Problem;
import com.university.codesolution.submitcode.submission.entity.Submission;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SearchProblemMapper {
    SearchProblemMapper INSTANCE = Mappers.getMapper(SearchProblemMapper.class);
    @Mapping(target = "submissionCount",
            expression = "java(problem.getSubmissions() != null ? problem.getSubmissions().size() : 0)")
    @Mapping(target = "acceptedCount",
            expression = "java(countAccepted(problem))")
    @Mapping(target = "title",
            expression = "java(problem.getName())")
    @Mapping(target = "difficulty",
            expression = "java(problem.getDifficultyLevel())")
    @Mapping(target = "status",
            expression = "java(getStatus(problem,userId))")
    @Mapping(target = "id",
            expression = "java(problem.getId())")
    ProblemDTO toDTO(Problem problem, Long userId);

    List<ProblemDTO> toDTOs(List<Problem> problems);

    @Mapping(target = "librariesSupports", ignore = true)
    @Mapping(target = "testCases", ignore = true)
    @Mapping(target = "functionName", ignore = true)
    @Mapping(target = "outputDataType", ignore = true)
    @Mapping(target = "description", ignore = true)
    @Mapping(target = "point", ignore = true)

    Problem toEntity(ProblemDTO problemDTO);

    List<Problem> toEntities(List<ProblemDTO> problemDTOs);

    default int countAccepted(Problem problem) {
        return problem.getSubmissions() != null ? (int) problem.getSubmissions().stream().filter(s -> s.getStatus().equals(Submission.EStatus.ACCEPTED)).count() : 0;
    }
    default EStatus getStatus(Problem problem, Long userId) {

        long attemptedCount = problem.getSubmissions()
                .stream()
                .filter(submission -> submission.getUser().getId().equals(userId))
                .count();

        long acceptedCount = problem.getSubmissions()
                .stream()
                .filter(submission -> submission.getUser().getId().equals(userId)
                        && submission.getStatus().equals(Submission.EStatus.ACCEPTED))
                .count();

        if (attemptedCount <= 0) {
            return EStatus.TODO;
        } else if (acceptedCount > 0) {
            return EStatus.SOLVED;
        } else {
            return EStatus.ATTEMPTED;
        }
    }
}
