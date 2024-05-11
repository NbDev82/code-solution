package com.university.codesolution.common;

import com.university.codesolution.contest.dto.ContestDTO;
import com.university.codesolution.contest.entity.Contest;
import com.university.codesolution.contest.request.AddContestRequest;
import com.university.codesolution.contest.service.ContestService;
import com.university.codesolution.login.customenum.ERole;
import com.university.codesolution.login.entity.User;
import com.university.codesolution.login.repository.UserRepos;
import com.university.codesolution.submitcode.library.entity.LibrariesSupport;
import com.university.codesolution.submitcode.library.repository.LibraryRepository;
import com.university.codesolution.submitcode.parameter.entity.Parameter;
import com.university.codesolution.submitcode.parameter.repository.ParameterRepository;
import com.university.codesolution.submitcode.problem.entity.Problem;
import com.university.codesolution.submitcode.problem.repository.ProblemRepository;
import com.university.codesolution.submitcode.testcase.entity.TestCase;
import com.university.codesolution.submitcode.testcase.repository.TestCaseRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
@Transactional
public class initData {
    @Autowired
    private ProblemRepository problemRepository;
    @Autowired
    private LibraryRepository libraryRepository;
    @Autowired
    private ParameterRepository parameterRepository;
    @Autowired
    private TestCaseRepository testCaseRepository;
    @Autowired
    private UserRepos userRepos;
    @Autowired
    private ContestService contestService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    public void init(){
        deleteAll();


        List<User> savedUsers = initUsers();
        if (savedUsers.isEmpty()) {
            return;
        }

        List<Problem> savedProblems = initProblems(savedUsers.get(0));
        if (savedProblems.isEmpty()) {
            return;
        }

        List<Long> savedProblemIds = savedProblems.stream()
                .map(Problem::getId)
                .toList();


        List<Long> savedUserIds = new ArrayList<>(savedUsers.stream()
                .map(User::getId)
                .toList());
        Long ownerId = savedUserIds.get(0);
        savedUserIds.removeIf(userId -> userId.equals(ownerId));
        initContests(ownerId, savedProblemIds, savedUserIds);
    }

    private void deleteAll() {
        userRepos.deleteAll();
        libraryRepository.deleteAll();
        testCaseRepository.deleteAll();
        parameterRepository.deleteAll();
        problemRepository.deleteAll();
    }

    private List<User> initUsers() {
        List<User> savedUsers = new ArrayList();

        User user=User.builder()
                .fullName("John Doe")
                .phoneNumber("123456789")
                .dateOfBirth(LocalDateTime.of(1990, 1, 1, 0, 0))
                .email("john.doe@example.com")
                .password(passwordEncoder.encode("password"))
                .cumulativeScore(0)
                .addedAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .isActive(true)
                .role(ERole.USER)
                .build();

        User user1=User.builder()
                .fullName("Pie Atlantis")
                .phoneNumber("987654321")
                .dateOfBirth(LocalDateTime.of(1999, 1, 1, 0, 0))
                .email("atlantis.pie@example.com")
                .password(passwordEncoder.encode("password"))
                .cumulativeScore(0)
                .addedAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .isActive(true)
                .role(ERole.USER)
                .build();

        User user2 = User.builder()
                .fullName("Alice Wonderland")
                .phoneNumber("555123456")
                .dateOfBirth(LocalDateTime.of(1985, 5, 15, 0, 0))
                .email("alice@example.com")
                .password(passwordEncoder.encode("password123"))
                .cumulativeScore(0)
                .addedAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .isActive(true)
                .role(ERole.USER)
                .build();

        User user3 = User.builder()
                .fullName("Bob Smith")
                .phoneNumber("555987654")
                .dateOfBirth(LocalDateTime.of(1978, 9, 20, 0, 0))
                .email("bob@example.com")
                .password(passwordEncoder.encode("password456"))
                .cumulativeScore(0)
                .addedAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .isActive(true)
                .role(ERole.USER)
                .build();

        User user4 = User.builder()
                .fullName("Emma Johnson")
                .phoneNumber("555456789")
                .dateOfBirth(LocalDateTime.of(1992, 3, 10, 0, 0))
                .email("emma@example.com")
                .password(passwordEncoder.encode("password789"))
                .cumulativeScore(0)
                .addedAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .isActive(true)
                .role(ERole.USER)
                .build();

        savedUsers.add(userRepos.save(user));
        savedUsers.add(userRepos.save(user1));
        savedUsers.add(userRepos.save(user2));
        savedUsers.add(userRepos.save(user3));
        savedUsers.add(userRepos.save(user4));

        return savedUsers;
    }

    private List<Problem> initProblems(@NotNull User owner) {
        List<Problem> savedProblems = new ArrayList<>();
        savedProblems.add( buildProblem(owner) );
        savedProblems.add( buildProblem1(owner) );

        return savedProblems;
    }

    private void initContests(Long ownerId, List<Long> savedProblemIds, List<Long> participantIds) {
        final int NUMBERS_OF_CONTESTS = 16;
        final int ONE_HOUR_IN_MILIS = 60 * 60 * 1000;
        final int TWO_HOURS_IN_MILIS = 2 * 60 * 60 * 1000;
        Random random = new Random();

        for (int i = 0; i < NUMBERS_OF_CONTESTS; i++) {
            String title = "Weekly " + (i + 1);
            String desc = "This is for beginner " + (i + 1);
            int randomDuration = ONE_HOUR_IN_MILIS + random.nextInt(TWO_HOURS_IN_MILIS - ONE_HOUR_IN_MILIS + 1);
            AddContestRequest addContestRequest = AddContestRequest.builder()
                    .title(title)
                    .desc(desc)
                    .durationInMillis(randomDuration)
                    .ownerId(ownerId)
                    .problemIds(savedProblemIds)
                    .participantIds(participantIds)
                    .build();
            contestService.addContestWithProblemsAndParticipants(addContestRequest);
        }
    }

    public Problem buildProblem(User owner){
        List<Problem.ETopic> topics = new ArrayList<>();
        topics.add(Problem.ETopic.DATA_STRUCTURE);
        topics.add(Problem.ETopic.MATH);
        topics.add(Problem.ETopic.GEOMETRY);
        topics.add(Problem.ETopic.SEARCH);

        Problem problem = Problem.builder()
                .name("Palindrome Number")
                .addedAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .description("Given an integer x, return true if x is a \n" +
                        "palindrome\n" +
                        ", and false otherwise.")
                .point(10)
                .difficultyLevel(Problem.EDifficultyLevel.EASY)
                .topics(topics)
                .functionName("isPalindrome")
                .isDeleted(false)
                .outputDataType("boolean")
                .description("Given an integer x, return true if x is a \n" +
                        "palindrome\n" +
                        ", and false otherwise.")
                .owner(owner)
                .build();

        buildTestCase(problem);
        buildLibrary(problem);
        return problemRepository.save(problem);
    }

    private void buildLibrary(Problem problem) {
        LibrariesSupport librariesSupport1 = LibrariesSupport.builder()
                .name("java.util.ArrayList")
                .problem(problem)
                .build();
        libraryRepository.save(librariesSupport1);

        LibrariesSupport librariesSupport2 = LibrariesSupport.builder()
                .name("java.util.List")
                .problem(problem)
                .build();
        libraryRepository.save(librariesSupport2);
    }

    private void buildTestCase(Problem problem) {
        TestCase testCase = TestCase.builder()
                .outputData("true")
                .problem(problem)
                .build();
        buildParameters(testCase,"525");
        testCaseRepository.save(testCase);

        TestCase testCase1 = TestCase.builder()
                .outputData("false")
                .problem(problem)
                .build();
        buildParameters(testCase1, "523");
        testCaseRepository.save(testCase1);
    }

    private void buildParameters(TestCase testCase, String x) {
        Parameter parameter1 = Parameter.builder()
                .inputDataType("int")
                .name("x")
                .inputData(x)
                .testCase(testCase)
                .build();
        parameterRepository.save(parameter1);

    }

    public Problem buildProblem1(User owner){
        List<Problem.ETopic> topics = new ArrayList<>();
        topics.add(Problem.ETopic.DATA_STRUCTURE);
        topics.add(Problem.ETopic.RECURSION);
        topics.add(Problem.ETopic.GEOMETRY);
        topics.add(Problem.ETopic.SEARCH);

        Problem problem = Problem.builder()
                .name("Missing Number")
                .addedAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .description("Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Example 1:\n" +
                        "\n" +
                        "Input: nums = [3,0,1]\n" +
                        "Output: 2\n" +
                        "Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.\n" +
                        "Example 2:\n" +
                        "\n" +
                        "Input: nums = [0,1]\n" +
                        "Output: 2\n" +
                        "Explanation: n = 2 since there are 2 numbers, so all numbers are in the range [0,2]. 2 is the missing number in the range since it does not appear in nums.\n" +
                        "Example 3:\n" +
                        "\n" +
                        "Input: nums = [9,6,4,2,3,5,7,0,1]\n" +
                        "Output: 8\n" +
                        "Explanation: n = 9 since there are 9 numbers, so all numbers are in the range [0,9]. 8 is the missing number in the range since it does not appear in nums.\n" +
                        " \n" +
                        "\n" +
                        "Constraints:\n" +
                        "\n" +
                        "n == nums.length\n" +
                        "1 <= n <= 104\n" +
                        "0 <= nums[i] <= n\n" +
                        "All the numbers of nums are unique.\n" +
                        " \n" +
                        "\n" +
                        "Follow up: Could you implement a solution using only O(1) extra space complexity and O(n) runtime complexity?")
                .point(2)
                .difficultyLevel(Problem.EDifficultyLevel.EASY)
                .topics(topics)
                .functionName("missingNumber")
                .isDeleted(false)
                .outputDataType("int")
                .owner(owner)
                .build();

        buildTestCase1(problem);
        buildLibrary1(problem);
        return problemRepository.save(problem);
    }

    private void buildLibrary1(Problem problem) {
        LibrariesSupport librariesSupport1 = LibrariesSupport.builder()
                .name("java.util.ArrayList")
                .problem(problem)
                .build();
        libraryRepository.save(librariesSupport1);

        LibrariesSupport librariesSupport2 = LibrariesSupport.builder()
                .name("java.util.List")
                .problem(problem)
                .build();
        libraryRepository.save(librariesSupport2);
    }

    private void buildTestCase1(Problem problem) {
        TestCase testCase = TestCase.builder()
                .outputData("2")
                .problem(problem)
                .build();
        buildParameters1(testCase,"{3, 0, 1}");
        testCaseRepository.save(testCase);

        TestCase testCase1 = TestCase.builder()
                .outputData("8")
                .problem(problem)
                .build();
        buildParameters1(testCase1, "{9, 6, 4, 2, 3, 5, 7, 0, 1}");
        testCaseRepository.save(testCase1);
    }

    private void buildParameters1(TestCase testCase, String x) {
        Parameter parameter1 = Parameter.builder()
                .inputDataType("int[]")
                .name("nums")
                .inputData(x)
                .testCase(testCase)
                .build();
        parameterRepository.save(parameter1);

    }
}
