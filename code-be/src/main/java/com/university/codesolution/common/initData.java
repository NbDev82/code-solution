package com.university.codesolution.common;

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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    private PasswordEncoder passwordEncoder;

    @Bean
    public void init(){
        deleteAll();

        buildProblem();
        buildProblem1();
        User user=User.builder()
                .id(1L)
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
                .id(1L)
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

        userRepos.save(user);
        userRepos.save(user1);
    }

    private void deleteAll() {
        deleteParameter();
        deleteTestCase();
        deleteLibrary();
        deleteProblem();
        deleteUser();
    }

    private void deleteUser() {
        userRepos.deleteAll();
    }

    private void deleteLibrary() {
        libraryRepository.deleteAll();
    }

    private void deleteTestCase() {
        testCaseRepository.deleteAll();
    }

    private void deleteParameter() {
        parameterRepository.deleteAll();
    }

    private void deleteProblem() {
        problemRepository.deleteAll();
    }

    public void buildProblem(){
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
                .build();

        buildTestCase(problem);
        buildLibrary(problem);
        problemRepository.save(problem);
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

    public void buildProblem1(){
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
                .build();

        buildTestCase1(problem);
        buildLibrary1(problem);
        problemRepository.save(problem);
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