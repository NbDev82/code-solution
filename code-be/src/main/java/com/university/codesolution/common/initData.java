package com.university.codesolution.common;

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
                .email("vanantran99@gmail.com")
                .password(passwordEncoder.encode("password"))
                .cumulativeScore(0)
                .addedAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .isActive(true)
                .role(ERole.USER)
                .build();

        User user1=User.builder()
                .fullName("Văn An")
                .phoneNumber("987654321")
                .dateOfBirth(LocalDateTime.of(2003, 1, 1, 0, 0))
                .email("vanantran05@gmail.com")
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
        savedProblems.add( buildProblem2(owner) );
        savedProblems.add( buildProblem3(owner) );
        savedProblems.add( buildProblem4(owner) );
        savedProblems.add( buildProblem5(owner) );
        savedProblems.add( buildProblem6(owner) );
        savedProblems.add( buildProblem7(owner) );
        savedProblems.add( buildProblem8(owner) );
        savedProblems.add( buildProblem9(owner) );
        savedProblems.add( buildProblem10(owner) );
        savedProblems.add( buildProblem11(owner) );
        savedProblems.add( buildProblem12(owner) );
        savedProblems.add( buildProblem13(owner) );
        savedProblems.add( buildProblem14(owner) );
        savedProblems.add( buildProblem15(owner) );
        savedProblems.add( buildProblem16(owner) );
        savedProblems.add( buildProblem17(owner) );
        savedProblems.add( buildProblem18(owner) );


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

    public Problem buildProblem(User user){
        List<Problem.ETopic> topics = new ArrayList<>();
        topics.add(Problem.ETopic.DATA_STRUCTURE);
        topics.add(Problem.ETopic.MATH);
        topics.add(Problem.ETopic.GEOMETRY);
        topics.add(Problem.ETopic.SEARCH);

        Problem problem = Problem.builder()
                .owner(user)
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

    public Problem buildProblem1(User user){
        List<Problem.ETopic> topics = new ArrayList<>();
        topics.add(Problem.ETopic.DATA_STRUCTURE);
        topics.add(Problem.ETopic.RECURSION);
        topics.add(Problem.ETopic.GEOMETRY);
        topics.add(Problem.ETopic.SEARCH);

        Problem problem = Problem.builder()
                .owner(user)
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

    public Problem buildProblem2(User user) {
        List<Problem.ETopic> topics = new ArrayList<>();
        topics.add(Problem.ETopic.MATH);
        topics.add(Problem.ETopic.ARRAY);

        Problem problem = Problem.builder()
                .owner(user)
                .name("Simple Array Sum")
                .addedAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .description("Write a function to calculate the sum of all elements in an integer array.\n" +
                        "\n" +
                        "Use the provided function signature:\n" +
                        "\n" +
                        "int arraySum(int[] arr)\n" +
                        "\n" +
                        "Example Test Case:\n" +
                        "\n" +
                        "Input: arr = [1, 2, 3, 4, 5]\n" +
                        "\n" +
                        "Output: 15\n" +
                        "\n" +
                        "Constraints:\n" +
                        "\n" +
                        "The length of the array is between 1 and 1000.\n" +
                        "Each element of the array is between -1000 and 1000.")
                .point(1)
                .difficultyLevel(Problem.EDifficultyLevel.EASY)
                .topics(topics)
                .functionName("arraySum")
                .isDeleted(false)
                .outputDataType("int")
                .build();

        buildTestCase2(problem);
        return problemRepository.save(problem);
    }

    private void buildTestCase2(Problem problem) {
        TestCase testCase = TestCase.builder()
                .outputData("15")
                .problem(problem)
                .build();
        buildParameters2(testCase, "{1, 2, 3, 4, 5}");

        testCaseRepository.save(testCase);
    }

    private void buildParameters2(TestCase testCase, String arr) {
        Parameter parameter1 = Parameter.builder()
                .inputDataType("int[]")
                .name("arr")
                .inputData(arr)
                .testCase(testCase)
                .build();

        parameterRepository.save(parameter1);
    }


    public Problem buildProblem3(User user){
        List<Problem.ETopic> topics = new ArrayList<>();
        topics.add(Problem.ETopic.ARRAY);
        topics.add(Problem.ETopic.SEARCH);

        Problem problem = Problem.builder()
                .owner(user)
                .name("Search in Rotated Sorted Array")
                .addedAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .description("You are given an integer array nums sorted in ascending order (with distinct values), and an integer target.\n" +
                        "\n" +
                        "Suppose that nums is rotated at some pivot unknown to you beforehand (i.e., [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2]).\n" +
                        "\n" +
                        "If target is found in the array return its index, otherwise, return -1.\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Example 1:\n" +
                        "\n" +
                        "Input: nums = [4,5,6,7,0,1,2], target = 0\n" +
                        "Output: 4\n" +
                        "Example 2:\n" +
                        "\n" +
                        "Input: nums = [4,5,6,7,0,1,2], target = 3\n" +
                        "Output: -1\n" +
                        "Example 3:\n" +
                        "\n" +
                        "Input: nums = [1], target = 0\n" +
                        "Output: -1\n" +
                        " \n" +
                        "\n" +
                        "Constraints:\n" +
                        "\n" +
                        "1 <= nums.length <= 5000\n" +
                        "-104 <= nums[i] <= 104\n" +
                        "All values of nums are unique.\n" +
                        "nums is guaranteed to be rotated at some pivot.\n" +
                        "-104 <= target <= 104")
                .point(3)
                .difficultyLevel(Problem.EDifficultyLevel.NORMAL)
                .topics(topics)
                .functionName("search")
                .isDeleted(false)
                .outputDataType("int")
                .build();

        buildTestCase3(problem);
        buildLibrary3(problem);
        return problemRepository.save(problem);
    }

    private void buildLibrary3(Problem problem) {
        LibrariesSupport librariesSupport1 = LibrariesSupport.builder()
                .name("java.util.Arrays")
                .problem(problem)
                .build();
        libraryRepository.save(librariesSupport1);
    }

    private void buildTestCase3(Problem problem) {
        TestCase testCase = TestCase.builder()
                .outputData("4")
                .problem(problem)
                .build();
        buildParameters3(testCase,"{4, 5, 6, 7, 0, 1, 2}", "0");
        testCaseRepository.save(testCase);

        TestCase testCase1 = TestCase.builder()
                .outputData("-1")
                .problem(problem)
                .build();
        buildParameters3(testCase1, "{4, 5, 6, 7, 0, 1, 2}", "3");
        testCaseRepository.save(testCase1);

        TestCase testCase2 = TestCase.builder()
                .outputData("-1")
                .problem(problem)
                .build();
        buildParameters3(testCase2, "{1}", "0");
        testCaseRepository.save(testCase2);
    }

    private void buildParameters3(TestCase testCase, String nums, String target) {
        Parameter parameter1 = Parameter.builder()
                .inputDataType("int[]")
                .name("nums")
                .inputData(nums)
                .testCase(testCase)
                .build();
        parameterRepository.save(parameter1);

        Parameter parameter2 = Parameter.builder()
                .inputDataType("int")
                .name("target")
                .inputData(target)
                .testCase(testCase)
                .build();
        parameterRepository.save(parameter2);
    }

    public Problem buildProblem4(User user){
        List<Problem.ETopic> topics = new ArrayList<>();
        topics.add(Problem.ETopic.STRING);
        topics.add(Problem.ETopic.REGEX);

        Problem problem = Problem.builder()
                .owner(user)
                .name("Longest Palindromic Subsequence")
                .addedAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .description("Given a string s, find the longest palindromic subsequence's length in s.\n" +
                        "\n" +
                        "A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.\n" +
                        "\n" +
                        " \n" +
                        "\n" +
                        "Example 1:\n" +
                        "\n" +
                        "Input: s = \"bbbab\"\n" +
                        "Output: 4\n" +
                        "Explanation: One possible longest palindromic subsequence is \"bbbb\".\n" +
                        "Example 2:\n" +
                        "\n" +
                        "Input: s = \"cbbd\"\n" +
                        "Output: 2\n" +
                        "Explanation: One possible longest palindromic subsequence is \"bb\".\n" +
                        " \n" +
                        "\n" +
                        "Constraints:\n" +
                        "\n" +
                        "1 <= s.length <= 1000\n" +
                        "s consists only of lowercase English letters.")
                .point(4)
                .difficultyLevel(Problem.EDifficultyLevel.NORMAL)
                .topics(topics)
                .functionName("longestPalindromeSubseq")
                .isDeleted(false)
                .outputDataType("int")
                .build();

        buildTestCase4(problem);
        buildLibrary4(problem);
        return problemRepository.save(problem);
    }

    private void buildLibrary4(Problem problem) {
        LibrariesSupport librariesSupport1 = LibrariesSupport.builder()
                .name("java.lang.StringBuilder")
                .problem(problem)
                .build();
        libraryRepository.save(librariesSupport1);
    }

    private void buildTestCase4(Problem problem) {
        TestCase testCase = TestCase.builder()
                .outputData("4")
                .problem(problem)
                .build();
        buildParameters4(testCase,"\"bbbab\"");
        testCaseRepository.save(testCase);

        TestCase testCase1 = TestCase.builder()
                .outputData("2")
                .problem(problem)
                .build();
        buildParameters4(testCase1, "\"cbbd\"");
        testCaseRepository.save(testCase1);
    }

    private void buildParameters4(TestCase testCase, String s) {
        Parameter parameter1 = Parameter.builder()
                .inputDataType("String")
                .name("s")
                .inputData(s)
                .testCase(testCase)
                .build();
        parameterRepository.save(parameter1);
    }

    public Problem buildProblem5(User user) {
        List<Problem.ETopic> topics = new ArrayList<>();
        topics.add(Problem.ETopic.ARRAY);
        topics.add(Problem.ETopic.MATH);

        Problem problem = Problem.builder()
                .owner(user)
                .name("Two Sum")
                .addedAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .description("Given an array of numbers nums and a target number target, " +
                        "find two numbers in nums such that they add up to target.\n" +
                        "\n" +
                        "You may return the indices of the two numbers in any order.\n" +
                        "\n" +
                        "Example 1:\n" +
                        "\n" +
                        "Input: nums = [2, 7, 11, 15], target = 9\n" +
                        "Output: [0, 1]\n" +
                        "Explanation: Because nums[0] + nums[1] = 2 + 7 = 9.\n" +
                        "\n" +
                        "Example 2:\n" +
                        "\n" +
                        "Input: nums = [2, 3, 4], target = 6\n" +
                        "Output: [1, 2]\n" +
                        "Explanation: Because nums[1] + nums[2] = 3 + 4 = 6.\n" +
                        "\n" +
                        "Example 3:\n" +
                        "\n" +
                        "Input: nums = [2, 3, 4], target = 7\n" +
                        "Output: [-1, -1]\n" +
                        "Explanation: If there are no two numbers that add up to the target, return [-1, -1].\n" +
                        "\n" +
                        "Constraints:\n" +
                        "\n" +
                        "2 <= nums.length <= 10^4\n" +
                        "-10^9 <= nums[i] <= 10^9\n" +
                        "-10^9 <= target <= 10^9")
                .point(3)
                .difficultyLevel(Problem.EDifficultyLevel.EASY)
                .topics(topics)
                .functionName("twoSum")
                .isDeleted(false)
                .outputDataType("int[]")
                .build();

        buildTestCase5(problem);
        buildLibrary5(problem);
        return problemRepository.save(problem);
    }

    private void buildLibrary5(Problem problem) {
        // Add libraries used in the solution here (e.g., HashMap)
        LibrariesSupport librariesSupport = LibrariesSupport.builder()
                .name("java.util.HashMap")
                .problem(problem)
                .build();
        libraryRepository.save(librariesSupport);
    }

    private void buildTestCase5(Problem problem) {
        TestCase testCase = TestCase.builder()
                .outputData("{0, 1}")
                .problem(problem)
                .build();
        buildParameters5(testCase, "{{2, 7, 11, 15}", "9");

        TestCase testCase1 = TestCase.builder()
                .outputData("{1, 2}")
                .problem(problem)
                .build();
        buildParameters5(testCase1, "{2, 3, 4}", "6");

        TestCase testCase2 = TestCase.builder()
                .outputData("{-1, -1}")
                .problem(problem)
                .build();
        buildParameters5(testCase2, "{2, 3, 4}", "7");

        testCaseRepository.save(testCase);
        testCaseRepository.save(testCase1);
        testCaseRepository.save(testCase2);
    }

    private void buildParameters5(TestCase testCase, String s, String target) {
        Parameter parameter1 = Parameter.builder()
                .inputDataType("int[]")
                .name("nums")
                .inputData(s)
                .testCase(testCase)
                .build();
        parameterRepository.save(parameter1);

        Parameter parameter2 = Parameter.builder()
                .inputDataType("int")
                .name("target")
                .inputData(target)
                .testCase(testCase)
                .build();
        parameterRepository.save(parameter2);
    }
    public Problem buildProblem6(User user) {
        List<Problem.ETopic> topics = new ArrayList<>();
        topics.add(Problem.ETopic.STRING);
        topics.add(Problem.ETopic.RECURSION);

        Problem problem = Problem.builder()
                .owner(user)
                .name("Reverse a String")
                .addedAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .description("Given a string s, reverse the order of characters in the string and return the reversed string.\n" +
                        "\n" +
                        "Example 1:\n" +
                        "\n" +
                        "Input: s = \"hello\"\n" +
                        "Output: \"olleh\"\n" +
                        "\n" +
                        "Example 2:\n" +
                        "\n" +
                        "Input: s = \"A man, a plan, a canal: Panama!\"\n" +
                        "Output: \"!anam! canal ,nalp a ,nam A\"\n" +
                        "\n" +
                        "Constraints:\n" +
                        "\n" +
                        "1 <= s.length <= 1000\n" +
                        "s consists of lowercase and uppercase English letters")
                .point(2)
                .difficultyLevel(Problem.EDifficultyLevel.EASY)
                .topics(topics)
                .functionName("reverseString")
                .isDeleted(false)
                .outputDataType("String")
                .build();

        buildTestCase6(problem);
        buildLibrary6(problem);
        return problemRepository.save(problem);
    }

    private void buildLibrary6(Problem problem) {
        // Add libraries used in the solution here (e.g., StringBuilder)
        LibrariesSupport librariesSupport = LibrariesSupport.builder()
                .name("java.lang.StringBuilder")
                .problem(problem)
                .build();
        libraryRepository.save(librariesSupport);
    }

    private void buildTestCase6(Problem problem) {
        TestCase testCase = TestCase.builder()
                .outputData("\"olleh\"")
                .problem(problem)
                .build();
        buildParameters6(testCase, "\"hello\"");

        TestCase testCase1 = TestCase.builder()
                .outputData("\"!anam! canal ,nalp a ,nam A\"")
                .problem(problem)
                .build();
        buildParameters6(testCase1, "\"A man, a plan, a canal: Panama!\"\n");

        testCaseRepository.save(testCase);
        testCaseRepository.save(testCase1);
    }

    private void buildParameters6(TestCase testCase, String s) {
        Parameter parameter1 = Parameter.builder()
                .inputDataType("String")
                .name("s")
                .inputData(s)
                .testCase(testCase)
                .build();
        parameterRepository.save(parameter1);
    }

    public Problem buildProblem7(User user) {
        List<Problem.ETopic> topics = new ArrayList<>();
        topics.add(Problem.ETopic.STRING);
        topics.add(Problem.ETopic.REGEX);

        Problem problem = Problem.builder()
                .owner(user)
                .name("Validate an IP Address")
                .addedAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .description("Given a string s, return true if the string is a valid IPv4 address and false otherwise.\n" +
                        "\n" +
                        "IPv4 addresses are represented in the format \"A.B.C.D\", where A, B, C, and D are integers ranging from 0 to 255. Each integer is separated by a dot (.).\n" +
                        "\n" +
                        "The IPv4 address cannot start or end with a dot.\n" +
                        "Each integer in the IPv4 address cannot have leading zeros, except for the number 0 itself.\n" +
                        "For example:\n" +
                        "\n" +
                        "Input: s = \"172.168.1.1\"\n" +
                        "Output: true\n" +
                        "Explanation: This is a valid IPv4 address.\n" +
                        "\n" +
                        "Input: s = \"172.168.1.256\"\n" +
                        "Output: false\n" +
                        "Explanation: 256 is out of the range [0, 255] for IPv4 addresses.\n" +
                        "\n" +
                        "Input: s = \"172.168.1.\"\n" +
                        "Output: false\n" +
                        "Explanation: An IPv4 address cannot end with a dot.\n" +
                        "\n" +
                        "Constraints:\n" +
                        "\n" +
                        "1 <= s.length <= 50\n" +
                        "s consists of digits and dots only.")
                .point(3)
                .difficultyLevel(Problem.EDifficultyLevel.NORMAL)
                .topics(topics)
                .functionName("isValidIpAddress")
                .isDeleted(false)
                .outputDataType("boolean")
                .build();

        buildTestCase7(problem);
        buildLibrary7(problem);
        return problemRepository.save(problem);
    }

    private void buildLibrary7(Problem problem) {
        // Add libraries used in the solution here (e.g., Pattern, Matcher)
        LibrariesSupport librariesSupport = LibrariesSupport.builder()
                .name("java.util.regex.Pattern")
                .name("java.util.regex.Matcher")
                .problem(problem)
                .build();
        libraryRepository.save(librariesSupport);
    }

    private void buildTestCase7(Problem problem) {
        TestCase testCase = TestCase.builder()
                .outputData("true")
                .problem(problem)
                .build();
        buildParameters7(testCase, "\"172.168.1.1\"");

        TestCase testCase1 = TestCase.builder()
                .outputData("false")
                .problem(problem)
                .build();
        buildParameters7(testCase1, "\"172.168.1.256\"");

        TestCase testCase2 = TestCase.builder()
                .outputData("false")
                .problem(problem)
                .build();
        buildParameters7(testCase2, "\"172.168.1.\"");

        testCaseRepository.save(testCase);
        testCaseRepository.save(testCase1);
        testCaseRepository.save(testCase2);
    }

    private void buildParameters7(TestCase testCase, String s) {
        Parameter parameter1 = Parameter.builder()
                .inputDataType("String")
                .name("s")
                .inputData(s)
                .testCase(testCase)
                .build();
        parameterRepository.save(parameter1);
    }
    public Problem buildProblem8(User user) {
        List<Problem.ETopic> topics = new ArrayList<>();
        topics.add(Problem.ETopic.STRING);
        topics.add(Problem.ETopic.GEOMETRY);

        Problem problem = Problem.builder()
                .owner(user)
                .name("Longest Common Prefix")
                .addedAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .description("Given an array of strings strs, find the longest common prefix.\n" +
                        "\n" +
                        "If there is no common prefix, return an empty string.\n" +
                        "\n" +
                        "Example 1:\n" +
                        "\n" +
                        "Input: strs = [\"flower\",\"flow\",\"flight\"]\n" +
                        "Output: \"fl\"\n" +
                        "\n" +
                        "Explanation: The longest common prefix is \"fl\".\n" +
                        "\n" +
                        "Example 2:\n" +
                        "\n" +
                        "Input: strs = [\"dog\",\"racecar\",\"race\"]\n" +
                        "Output: \"\"\n" +
                        "\n" +
                        "Explanation: There is no common prefix among the strings in the array.\n" +
                        "\n" +
                        "Constraints:\n" +
                        "\n" +
                        "1 <= strs.length <= 200\n" +
                        "strs[i].length <= 200\n" +
                        "strs[i] consists of lowercase English letters.")
                .point(2)
                .difficultyLevel(Problem.EDifficultyLevel.NORMAL)
                .topics(topics)
                .functionName("longestCommonPrefix")
                .isDeleted(false)
                .outputDataType("String")
                .build();

        buildTestCase8(problem);
        buildLibrary8(problem);
        return problemRepository.save(problem);
    }

    private void buildLibrary8(Problem problem) {
        // Add libraries used in the solution here (e.g., StringBuilder)
        LibrariesSupport librariesSupport = LibrariesSupport.builder()
                .name("java.lang.StringBuilder")
                .problem(problem)
                .build();
        libraryRepository.save(librariesSupport);
    }

    private void buildTestCase8(Problem problem) {
        TestCase testCase = TestCase.builder()
                .outputData("\"fl\"")
                .problem(problem)
                .build();
        buildParameters8(testCase, "[\"flower\",\"flow\",\"flight\"]");

        TestCase testCase1 = TestCase.builder()
                .outputData("\"\"")
                .problem(problem)
                .build();
        buildParameters8(testCase1, "[\"dog\",\"racecar\",\"race\"]");

        testCaseRepository.save(testCase);
        testCaseRepository.save(testCase1);
    }

    private void buildParameters8(TestCase testCase, String s) {
        Parameter parameter1 = Parameter.builder()
                .inputDataType("String[]")
                .name("strs")
                .inputData(s)
                .testCase(testCase)
                .build();
        parameterRepository.save(parameter1);
    }



    public Problem buildProblem9(User user) {
        List<Problem.ETopic> topics = new ArrayList<>();
        topics.add(Problem.ETopic.STRING);
        topics.add(Problem.ETopic.RECURSION);

        Problem problem = Problem.builder()
                .name("Count and Say")
                .owner(user)
                .addedAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .description("The count-and-say sequence is a series of strings where each string is formed by describing the previous string.\n" +
                        "\n" +
                        "To generate the nth string, follow these steps:\n" +
                        "\n" +
                        "1.  Start with the input string (for n = 1, this is simply \"1\").\n" +
                        "2.  Count the number of consecutive identical digits.\n" +
                        "3.  Append the count followed by the digit to the new string.\n" +
                        "4.  Repeat steps 2 and 3 for the new string until the desired nth string is generated.\n" +
                        "\n" +
                        "For example:\n" +
                        "\n" +
                        "Input: n = 1\n" +
                        "Output: \"1\"\n" +
                        "\n" +
                        "Explanation: The first string is \"1\".\n" +
                        "\n" +
                        "Input: n = 4\n" +
                        "Output: \"1211\"\n" +
                        "\n" +
                        "Explanation: The count-and-say sequence is \"1\", \"11\", \"21\", \"1211\". The 4th string is \"1211\".\n" +
                        "\n" +
                        "Constraints:\n" +
                        "\n" +
                        "1 <= n <= 30")
                .point(2)
                .difficultyLevel(Problem.EDifficultyLevel.HARD)
                .topics(topics)
                .functionName("countAndSay")
                .isDeleted(false)
                .outputDataType("String")
                .build();

        buildTestCase9(problem);
        buildLibrary9(problem);
        return problemRepository.save(problem);
    }

    private void buildLibrary9(Problem problem) {
        // Add libraries used in the solution here (e.g., StringBuilder)
        LibrariesSupport librariesSupport = LibrariesSupport.builder()
                .name("java.lang.StringBuilder")
                .problem(problem)
                .build();
        libraryRepository.save(librariesSupport);
    }

    private void buildTestCase9(Problem problem) {
        TestCase testCase = TestCase.builder()
                .outputData("\"1\"")
                .problem(problem)
                .build();
        buildParameters9(testCase, "1");

        TestCase testCase1 = TestCase.builder()
                .outputData("\"1211\"")
                .problem(problem)
                .build();
        buildParameters9(testCase1, "4");

        testCaseRepository.save(testCase);
        testCaseRepository.save(testCase1);
    }

    private void buildParameters9(TestCase testCase, String s) {
        Parameter parameter1 = Parameter.builder()
                .inputDataType("int")
                .name("n")
                .inputData(s)
                .testCase(testCase)
                .build();
        parameterRepository.save(parameter1);
    }

    public Problem buildProblem10(User user) {
        List<Problem.ETopic> topics = new ArrayList<>();
        topics.add(Problem.ETopic.MATH);

        Problem problem = Problem.builder()
                .owner(user)
                .name("Simple Addition")
                .addedAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .description("Write a function to compute the sum of two integers.\n" +
                        "\n" +
                        "Use the provided function signature:\n" +
                        "\n" +
                        "int add(int a, int b)\n" +
                        "\n" +
                        "Example Test Case:\n" +
                        "\n" +
                        "Input: a = 3, b = 5\n" +
                        "\n" +
                        "Output: 8\n" +
                        "\n" +
                        "Constraints:\n" +
                        "\n" +
                        "None.")
                .point(1)
                .difficultyLevel(Problem.EDifficultyLevel.EASY)
                .topics(topics)
                .functionName("add")
                .isDeleted(false)
                .outputDataType("int")
                .build();

        buildTestCase10(problem);
        return problemRepository.save(problem);
    }

    private void buildTestCase10(Problem problem) {
        TestCase testCase = TestCase.builder()
                .outputData("8")
                .problem(problem)
                .build();
        buildParameters10(testCase, 3, 5);

        testCaseRepository.save(testCase);
    }

    private void buildParameters10(TestCase testCase, int a, int b) {
        Parameter parameter1 = Parameter.builder()
                .inputDataType("int")
                .name("a")
                .inputData(String.valueOf(a))
                .testCase(testCase)
                .build();

        Parameter parameter2 = Parameter.builder()
                .inputDataType("int")
                .name("b")
                .inputData(String.valueOf(b))
                .testCase(testCase)
                .build();

        parameterRepository.save(parameter1);
        parameterRepository.save(parameter2);
    }


    public Problem buildProblem11(User user) {
        List<Problem.ETopic> topics = new ArrayList<>();
        topics.add(Problem.ETopic.STRING);
        topics.add(Problem.ETopic.DATA_STRUCTURE);

        Problem problem = Problem.builder()
                .owner(user)
                .name("Longest Palindrome")
                .addedAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .description("Given a string s, find the longest palindromic substring in s.\n" +
                        "\n" +
                        "You may assume that the maximum length of s is 1000.\n" +
                        "\n" +
                        "Example 1:\n" +
                        "\n" +
                        "Input: s = \"babad\"\n" +
                        "Output: \"bab\" or \"aba\"\n" +
                        "Explanation: \"babad\" is the longest palindromic substring in \"babad\". \"aba\" is also a valid solution.\n" +
                        "\n" +
                        "Example 2:\n" +
                        "\n" +
                        "Input: s = \"cbbd\"\n" +
                        "Output: \"bb\"\n" +
                        "Explanation: \"bb\" is the longest palindromic substring in \"cbbd\".\n" +
                        "\n" +
                        "Constraints:\n" +
                        "\n" +
                        "1 <= s.length <= 1000")
                .point(2)
                .difficultyLevel(Problem.EDifficultyLevel.NORMAL)
                .topics(topics)
                .functionName("longestPalindrome")
                .isDeleted(false)
                .outputDataType("String")
                .build();

        buildTestCase11(problem);
        buildLibrary11(problem);
        return problemRepository.save(problem);
    }

    private void buildLibrary11(Problem problem) {
        // Add libraries used in the solution here (e.g., StringBuilder)
        LibrariesSupport librariesSupport = LibrariesSupport.builder()
                .name("java.lang.StringBuilder")
                .problem(problem)
                .build();
        libraryRepository.save(librariesSupport);
    }

    private void buildTestCase11(Problem problem) {
        TestCase testCase = TestCase.builder()
                .outputData("\"bab\" or \"aba\"")
                .problem(problem)
                .build();
        buildParameters11(testCase, "\"babad\"");

        TestCase testCase1 = TestCase.builder()
                .outputData("\"bb\"")
                .problem(problem)
                .build();
        buildParameters11(testCase1, "\"cbbd\"");

        testCaseRepository.save(testCase);
        testCaseRepository.save(testCase1);
    }

    private void buildParameters11(TestCase testCase, String s) {
        Parameter parameter1 = Parameter.builder()
                .inputDataType("String")
                .name("s")
                .inputData(s)
                .testCase(testCase)
                .build();
        parameterRepository.save(parameter1);
    }

    public Problem buildProblem12(User user) {
        List<Problem.ETopic> topics = new ArrayList<>();
        topics.add(Problem.ETopic.STRING);
        topics.add(Problem.ETopic.DATA_STRUCTURE);

        Problem problem = Problem.builder()
                .owner(user)
                .name("Minimum Edit Distance")
                .addedAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .description("Given two strings word1 and word2, return the minimum number of operations required to transform one string into the other.\n" +
                        "\n" +
                        "Allowed operations are:\n" +
                        "\n" +
                        "Insert a character\n" +
                        "Delete a character\n" +
                        "Replace a character\n" +
                        "\n" +
                        "Example 1:\n" +
                        "\n" +
                        "Input: word1 = \"horse\", word2 = \"ros\"\n" +
                        "Output: 3\n" +
                        "Explanation: The minimum number of operations to transform \"horse\" into \"ros\" is 3. One way to do this is: \n" +
                        "1. Replace 'h' with 'r'\n" +
                        "2. Add 'o' after 'r'\n" +
                        "3. Add 's' after 'o'\n" +
                        "\n" +
                        "Example 2:\n" +
                        "\n" +
                        "Input: word1 = \"kitten\", word2 = \"sitting\"\n" +
                        "Output: 3\n" +
                        "Explanation: The minimum number of operations to transform \"kitten\" into \"sitting\" is 3. One way to do this is:\n" +
                        "1. Replace 'k' with 's'\n" +
                        "2. Replace 'e' with 'i'\n" +
                        "3. Add 'g' at the end.\n" +
                        "\n" +
                        "Constraints:\n" +
                        "\n" +
                        "0 <= word1.length, word2.length <= 1000")
                .point(2)
                .difficultyLevel(Problem.EDifficultyLevel.HARD)
                .topics(topics)
                .functionName("minEditDistance")
                .isDeleted(false)
                .outputDataType("int")
                .build();

        buildTestCase12(problem);
        buildLibrary12(problem);
        return problemRepository.save(problem);
    }

    private void buildLibrary12(Problem problem) {
        // Add libraries used in the solution here (e.g., StringBuilder)
        LibrariesSupport librariesSupport = LibrariesSupport.builder()
                .name("java.lang.StringBuilder")
                .problem(problem)
                .build();
        libraryRepository.save(librariesSupport);
    }

    private void buildTestCase12(Problem problem) {
        TestCase testCase = TestCase.builder()
                .outputData("3")
                .problem(problem)
                .build();
        buildParameters12(testCase, "\"horse\"", "\"ros\"");

        TestCase testCase1 = TestCase.builder()
                .outputData("3")
                .problem(problem)
                .build();
        buildParameters12(testCase1, "\"kitten\"", "\"sitting\"");

        testCaseRepository.save(testCase);
        testCaseRepository.save(testCase1);
    }

    private void buildParameters12(TestCase testCase, String s1, String s2) {
        Parameter parameter1 = Parameter.builder()
                .inputDataType("String")
                .name("word1")
                .inputData(s1)
                .testCase(testCase)
                .build();

        Parameter parameter2 = Parameter.builder()
                .inputDataType("String")
                .name("word2")
                .inputData(s2)
                .testCase(testCase)
                .build();

        parameterRepository.save(parameter1);
        parameterRepository.save(parameter2);
    }
    public Problem buildProblem13(User user) {
        List<Problem.ETopic> topics = new ArrayList<>();
        topics.add(Problem.ETopic.STRING);
        topics.add(Problem.ETopic.RECURSION);

        Problem problem = Problem.builder()
                .owner(user)
                .name("Longest Palindrome Subsequence")
                .addedAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .description("Given a string s, find the length of the longest palindromic subsequence in s.\n" +
                        "\n" +
                        "A palindromic subsequence is a sequence of characters that reads the same forward and backward but may not be contiguous.\n" +
                        "\n" +
                        "Example 1:\n" +
                        "\n" +
                        "Input: s = \"babad\"\n" +
                        "Output: 4\n" +
                        "Explanation: The longest palindromic subsequence in \"babad\" is \"bab\".\n" +
                        "\n" +
                        "Example 2:\n" +
                        "\n" +
                        "Input: s = \"cbbd\"\n" +
                        "Output: 2\n" +
                        "Explanation: The longest palindromic subsequence in \"cbbd\" is \"bb\".\n" +
                        "\n" +
                        "Constraints:\n" +
                        "\n" +
                        "1 <= s.length <= 1000")
                .point(2)
                .difficultyLevel(Problem.EDifficultyLevel.NORMAL)
                .topics(topics)
                .functionName("longestPalindromeSubsequence")
                .isDeleted(false)
                .outputDataType("int")
                .build();

        buildTestCase13(problem);
        buildLibrary13(problem);
        return problemRepository.save(problem);
    }

    private void buildLibrary13(Problem problem) {
        // Add libraries used in the solution here (e.g., StringBuilder)
        LibrariesSupport librariesSupport = LibrariesSupport.builder()
                .name("java.lang.StringBuilder")
                .problem(problem)
                .build();
        libraryRepository.save(librariesSupport);
    }

    private void buildTestCase13(Problem problem) {
        TestCase testCase = TestCase.builder()
                .outputData("4")
                .problem(problem)
                .build();
        buildParameters13(testCase, "\"babad\"");

        TestCase testCase1 = TestCase.builder()
                .outputData("2")
                .problem(problem)
                .build();
        buildParameters13(testCase1, "\"cbbd\"");

        testCaseRepository.save(testCase);
        testCaseRepository.save(testCase1);
    }

    private void buildParameters13(TestCase testCase, String s) {
        Parameter parameter1 = Parameter.builder()
                .inputDataType("String")
                .name("s")
                .inputData(s)
                .testCase(testCase)
                .build();
        parameterRepository.save(parameter1);
    }
    public Problem buildProblem14(User user) {
        List<Problem.ETopic> topics = new ArrayList<>();
        topics.add(Problem.ETopic.ARRAY);
        topics.add(Problem.ETopic.DATA_STRUCTURE);

        Problem problem = Problem.builder()
                .owner(user)
                .name("Maximum Subarray")
                .addedAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .description("Given an integer array nums, find the maximum subarray sum.\n" +
                        "\n" +
                        "A subarray is a contiguous part of the array.\n" +
                        "\n" +
                        "Example 1:\n" +
                        "\n" +
                        "Input: nums = [-2,1,-3,4,-1,2,1,-5,4]\n" +
                        "Output: 6\n" +
                        "Explanation: The maximum subarray is [4,-1,2,1], which has the sum 6.\n" +
                        "\n" +
                        "Example 2:\n" +
                        "\n" +
                        "Input: nums = [1,2,3,0,0,0]\n" +
                        "Output: 6\n" +
                        "Explanation: The maximum subarray is [1,2,3], which has the sum 6.\n" +
                        "\n" +
                        "Constraints:\n" +
                        "\n" +
                        "-100 <= nums[i] <= 100\n" +
                        "1 <= nums.length <= 10000")
                .point(2)
                .difficultyLevel(Problem.EDifficultyLevel.EASY)
                .topics(topics)
                .functionName("maxSubarray")
                .isDeleted(false)
                .outputDataType("int")
                .build();

        buildTestCase14(problem);
        buildLibrary14(problem);
        return problemRepository.save(problem);
    }

    private void buildLibrary14(Problem problem) {
        // Add libraries used in the solution here (e.g., Arrays)
        LibrariesSupport librariesSupport = LibrariesSupport.builder()
                .name("java.util.Arrays")
                .problem(problem)
                .build();
        libraryRepository.save(librariesSupport);
    }

    private void buildTestCase14(Problem problem) {
        TestCase testCase = TestCase.builder()
                .outputData("6")
                .problem(problem)
                .build();
        buildParameters14(testCase,"{-2,1,-3,4,-1,2,1,-5,4}");

        TestCase testCase1 = TestCase.builder()
                .outputData("6")
                .problem(problem)
                .build();
        buildParameters14(testCase1, "{1,2,3,0,0,0}");

        testCaseRepository.save(testCase);
        testCaseRepository.save(testCase1);
    }

    private void buildParameters14(TestCase testCase, String nums) {
        Parameter parameter1 = Parameter.builder()
                .inputDataType("int[]")
                .name("nums")
                .inputData(nums)
                .testCase(testCase)
                .build();
        parameterRepository.save(parameter1);
    }
    public Problem buildProblem15(User user) {
        List<Problem.ETopic> topics = new ArrayList<>();
        topics.add(Problem.ETopic.MATH);
        topics.add(Problem.ETopic.LOOPING);

        Problem problem = Problem.builder()
                .owner(user)
                .name("Find Prime Numbers in a Range")
                .addedAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .description("Given a range (start, end) where start <= end, your task is to find and print all prime numbers within that range.\n" +
                        "\n" +
                        "Use the isPrime function provided in the solution template.\n" +
                        "\n" +
                        "Example Test Case:\n" +
                        "\n" +
                        "findPrimeNumbersInRange(2, 20)\n" +
                        "\n" +
                        "Output:\n" +
                        "2\n" +
                        "3\n" +
                        "5\n" +
                        "7\n" +
                        "11\n" +
                        "13\n" +
                        "17\n" +
                        "19\n" +
                        "\n" +
                        "Constraints:\n" +
                        "\n" +
                        "start <= end\n" +
                        "1 <= start, end <= 100,000,000")
                .point(2)
                .difficultyLevel(Problem.EDifficultyLevel.EASY)
                .topics(topics)
                .functionName("findPrimeNumbersInRange")
                .isDeleted(false)
                .outputDataType("void")
                .build();

        buildTestCase15(problem);
        buildLibrary15(problem);
        return problemRepository.save(problem);
    }

    private void buildLibrary15(Problem problem) {
        // Add libraries used in the solution here (e.g., Arrays)
        LibrariesSupport librariesSupport = LibrariesSupport.builder()
                .name("java.util.Arrays")
                .problem(problem)
                .build();
        libraryRepository.save(librariesSupport);
    }

    private void buildTestCase15(Problem problem) {
        TestCase testCase = TestCase.builder()
                .outputData("2\n3\n5\n7\n11\n13\n17\n19\n")
                .problem(problem)
                .build();
        buildParameters15(testCase, 2, 20);

        testCaseRepository.save(testCase);
    }

    private void buildParameters15(TestCase testCase, int start, int end) {
        Parameter parameter1 = Parameter.builder()
                .inputDataType("int")
                .name("start")
                .inputData(String.valueOf(start))
                .testCase(testCase)
                .build();

        Parameter parameter2 = Parameter.builder()
                .inputDataType("int")
                .name("end")
                .inputData(String.valueOf(end))
                .testCase(testCase)
                .build();

        parameterRepository.save(parameter1);
        parameterRepository.save(parameter2);
    }
    public Problem buildProblem16(User user) {
        List<Problem.ETopic> topics = new ArrayList<>();
        topics.add(Problem.ETopic.MATH);

        Problem problem = Problem.builder()
                .owner(user)
                .name("Calculate Triangle Area")
                .addedAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .description("Given the side lengths or base and height of a triangle, calculate its area using the appropriate formula.\n" +
                        "\n" +
                        "Use the provided functions:\n" +
                        "\n" +
                        "calculateTriangleAreaUsingHeronsFormula(double a, double b, double c)\n" +
                        "calculateTriangleAreaUsingBaseAndHeight(double base, double height)\n" +
                        "\n" +
                        "Example Test Case:\n" +
                        "\n" +
                        "calculateTriangleAreaUsingHeronsFormula(3, 4, 5)\n" +
                        "calculateTriangleAreaUsingBaseAndHeight(5, 4)\n" +
                        "\n" +
                        "Output:\n" +
                        "Area using Heron's formula: 6.0\n" +
                        "Area using base and height formula: 10.0\n" +
                        "\n" +
                        "Constraints:\n" +
                        "\n" +
                        "All side lengths or base and height must be positive.\n" +
                        "Triangle side lengths must satisfy the triangle inequality (i.e., a + b > c, a + c > b, and b + c > a).")
                .point(2)
                .difficultyLevel(Problem.EDifficultyLevel.EASY)
                .topics(topics)
                .functionName("calculateTriangleArea")
                .isDeleted(false)
                .outputDataType("String")
                .build();

        buildTestCase16(problem);
        buildLibrary16(problem);
        return problemRepository.save(problem);
    }

    private void buildLibrary16(Problem problem) {
        // Add libraries used in the solution here (e.g., Math)
        LibrariesSupport librariesSupport = LibrariesSupport.builder()
                .name("java.lang.Math")
                .problem(problem)
                .build();
        libraryRepository.save(librariesSupport);
    }

    private void buildTestCase16(Problem problem) {
        TestCase testCase = TestCase.builder()
                .outputData("Area using Heron's formula: 6.0\nArea using base and height formula: 10.0\n")
                .problem(problem)
                .build();
        buildParameters16(testCase, 3, 4, 5, 5, 4);

        testCaseRepository.save(testCase);
    }

    private void buildParameters16(TestCase testCase, double a, double b, double c, double base, double height) {
        Parameter parameter1 = Parameter.builder()
                .inputDataType("double")
                .name("a")
                .inputData(String.valueOf(a))
                .testCase(testCase)
                .build();

        Parameter parameter2 = Parameter.builder()
                .inputDataType("double")
                .name("b")
                .inputData(String.valueOf(b))
                .testCase(testCase)
                .build();

        Parameter parameter3 = Parameter.builder()
                .inputDataType("double")
                .name("c")
                .inputData(String.valueOf(c))
                .testCase(testCase)
                .build();

        Parameter parameter4 = Parameter.builder()
                .inputDataType("double")
                .name("base")
                .inputData(String.valueOf(base))
                .testCase(testCase)
                .build();

        Parameter parameter5 = Parameter.builder()
                .inputDataType("double")
                .name("height")
                .inputData(String.valueOf(height))
                .testCase(testCase)
                .build();

        parameterRepository.save(parameter1);
        parameterRepository.save(parameter2);
        parameterRepository.save(parameter3);
        parameterRepository.save(parameter4);
        parameterRepository.save(parameter5);
    }

    public Problem buildProblem17(User user) {
        List<Problem.ETopic> topics = new ArrayList<>();
        topics.add(Problem.ETopic.ARRAY);

        Problem problem = Problem.builder()
                .owner(user)
                .name("Maximum Element in Array")
                .addedAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .description("Write a function to find the largest element in an integer array.\n" +
                        "\n" +
                        "Use the provided function signature:\n" +
                        "\n" +
                        "int findMax(int[] arr)\n" +
                        "\n" +
                        "Example Test Case:\n" +
                        "\n" +
                        "Input: arr = [5, 8, 2, 10, 3]\n" +
                        "\n" +
                        "Output: 10\n" +
                        "\n" +
                        "Constraints:\n" +
                        "\n" +
                        "The length of the array is between 1 and 1000.\n" +
                        "Each element of the array is between -1000 and 1000.")
                .point(1)
                .difficultyLevel(Problem.EDifficultyLevel.EASY)
                .topics(topics)
                .functionName("findMax")
                .isDeleted(false)
                .outputDataType("int")
                .build();
        buildTestCase17(problem);
        return problemRepository.save(problem);
    }

    private void buildTestCase17(Problem problem) {
        TestCase testCase = TestCase.builder()
                .outputData("10")
                .problem(problem)
                .build();
        buildParameters17(testCase,"{5, 8, 2, 10, 3}");

        testCaseRepository.save(testCase);
    }

    private void buildParameters17(TestCase testCase, String arr) {
        Parameter parameter1 = Parameter.builder()
                .inputDataType("int[]")
                .name("arr")
                .inputData(arr)
                .testCase(testCase)
                .build();

        parameterRepository.save(parameter1);
    }

    public Problem buildProblem18(User user) {
        List<Problem.ETopic> topics = new ArrayList<>();
        topics.add(Problem.ETopic.STRING);

        Problem problem = Problem.builder()
                .owner(user)
                .name("Reverse String")
                .addedAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .description("Write a function to reverse a given string.\n" +
                        "\n" +
                        "Use the provided function signature:\n" +
                        "\n" +
                        "String reverseString(String str)\n" +
                        "\n" +
                        "Example Test Case:\n" +
                        "\n" +
                        "Input: str = \"hello\"\n" +
                        "\n" +
                        "Output: \"olleh\"\n" +
                        "\n" +
                        "Constraints:\n" +
                        "\n" +
                        "The length of the input string is between 1 and 1000.")
                .point(1)
                .difficultyLevel(Problem.EDifficultyLevel.EASY)
                .topics(topics)
                .functionName("reverseString")
                .isDeleted(false)
                .outputDataType("String")
                .build();

        buildTestCase18(problem);
        return problemRepository.save(problem);
    }



    private void buildTestCase18(Problem problem) {
        TestCase testCase = TestCase.builder()
                .outputData("\"olleh\"")
                .problem(problem)
                .build();
        buildParameters18(testCase, "hello");

        testCaseRepository.save(testCase);
    }

    private void buildParameters18(TestCase testCase, String str) {
        Parameter parameter1 = Parameter.builder()
                .inputDataType("String")
                .name("str")
                .inputData(str)
                .testCase(testCase)
                .build();

        parameterRepository.save(parameter1);
    }

}