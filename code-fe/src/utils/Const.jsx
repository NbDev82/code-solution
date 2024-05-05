export const LIMIT_QUANTITY_TOPICS = 4;
export const LIMIT_ROW_PROBLEMS_TABLE = 20;
export const WEEKS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const ORIGINAL_API_URL = 'http://localhost:8000';
export const DIFFICULTY_DEFAULT = ['EASY', 'NORMAL', 'HARD'];
export const STATUS_DEFAULT = ['TODO', 'SOLVED', 'ATTEMPTED'];
export const DEFAULT_LOTTIE_OPTIONS = {
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};
export const PROBLEMS_SAMPLE = [
  {
    id: 1,
    ownerId: 1,
    title: 'Palindrome Number',
    description: 'Given an integer x, return true if x is a \npalindrome\n, and false otherwise.',
    point: 10.0,
    difficulty: 'EASY',
    topics: [],
    acceptedCount: 0,
    discussCount: 0,
    submissionCount: 0,
    acceptanceRate: '0',
    type: null,
    deleted: false,
    functionName: '',
    outputDataType: '',
  },
  {
    id: 2,
    ownerId: 1,
    title: 'Missing Number',
    description:
      'Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.\n\n \n\nExample 1:\n\nInput: nums = [3,0,1]\nOutput: 2\nExplanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.\nExample 2:\n\nInput: nums = [0,1]\nOutput: 2\nExplanation: n = 2 since there are 2 numbers, so all numbers are in the range [0,2]. 2 is the missing number in the range since it does not appear in nums.\nExample 3:\n\nInput: nums = [9,6,4,2,3,5,7,0,1]\nOutput: 8\nExplanation: n = 9 since there are 9 numbers, so all numbers are in the range [0,9]. 8 is the missing number in the range since it does not appear in nums.\n \n\nConstraints:\n\nn == nums.length\n1 <= n <= 104\n0 <= nums[i] <= n\nAll the numbers of nums are unique.\n \n\nFollow up: Could you implement a solution using only O(1) extra space complexity and O(n) runtime complexity?',
    point: 10.0,
    difficulty: 'EASY',
    topics: [],
    acceptedCount: 0,
    discussCount: 0,
    submissionCount: 0,
    acceptanceRate: '0',
    type: null,
    deleted: false,
    functionName: '',
    outputDataType: '',
  },
];
export const TOPICS_SAMPLE = [
  { id: 0, name: 'String', quantity: 22 },
  { id: 1, name: 'Array', quantity: 56 },
  { id: 2, name: 'Sorting', quantity: 18 },
  { id: 3, name: 'Math', quantity: 9 },
  { id: 4, name: 'Counting', quantity: 27 },
  { id: 5, name: 'Searching', quantity: 9 },
  { id: 6, name: 'Recursion', quantity: 26 },
  { id: 7, name: 'Regex', quantity: 11 },
  { id: 8, name: 'Random', quantity: 21 },
  { id: 9, name: 'Stack', quantity: 18 },
  { id: 10, name: 'Geometry', quantity: 6 },
  { id: 11, name: 'Data Structures', quantity: 2 },
  { id: 12, name: 'Looping', quantity: 7 },
];

export const STATISTICSDATASETS_SAMPLE = {
  totalEasy: 35,
  totalNormal: 12,
  totalHard: 5,
  Easy: [12, 2, 0, 2, 5, 6, 7],
  Normal: [8, 2, 5, 6, 8, 2, 0],
  Hard: [0, 1, 5, 6, 4, 8, 1],
};

export const USER_SAMPLE = {
  id: '12444',
  fullName: 'Nguyễn Trường An',
  phoneNumber: '032442215',
  dateOfBirth: '28/12/2003',
  email: 'ndgdh@gmail.com',
  avatarSrc: '',
};

export const DATA_LOGIN_SAMPLE = {
  token:
    'eyJhbGciOiJIUzI1NiJ9.eyJwaG9uZU51bWJlciI6IjA5OTk5OTk5OTkiLCJ1c2VySWQiOjQsImVtYWlsIjoibWluaHRyYW5AZ21haWwuY29tIiwic3ViIjoiMDk5OTk5OTk5OSIsImV4cCI6MTcxNzM5NDA0Nn0.ndEARKYxYy_9F_0joWNv4GjFA9O3AiqZsmtwfBmRxGs',
  message: 'user.login.login_successfully',
  user: {
    id: 4,
    fullName: 'Tran Cong Minh',
    phoneNumber: '0999999999',
    dateOfBirth: '2024-04-02T00:00:00',
    email: 'minhtran@gmail.com',
    urlImage:
      'https://avataaars.io/?accessoriesType=Round&avatarStyle=Circle&clotheColor=Blue03&clotheType=BlazerSweater&eyeType=Close&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=MoustacheMagnum&hairColor=Blonde&hatColor=Black&mouthType=Disbelief&skinColor=Tanned&topType=WinterHat1',
    password: '$2a$10$6jLq7WfPOyN18jpUJc8ESeGAyrAa3ikHmCA6gwuVLoff6wI6gxNyG',
    cumulativeScore: 0.0,
    addedAt: null,
    updatedAt: null,
    role: 'USER',
  },
};

export const EMOJI_COMMENT = {
  love: { emoji: '❤️', name: 'Love' },
  woww: { emoji: '😲', name: 'Woww' },
  humm: { emoji: '🙄', name: 'Humm' },
  haha: { emoji: '😆', name: 'Haha' },
  huhu: { emoji: '😭', name: 'Huhu' },
  angry: { emoji: '😡', name: 'Angry' },
};

export const COMMENTS_SAMPLE = [
  {
    id: 1,
    text: 'Bạn Trường An rất là đẹp trai và dthw !',
    updateAt: '1th5 21:41',
    userName: 'Nguyễn Văn Hoàng',
    emoji: EMOJI_COMMENT.love,
    emojiQuantity: 99,
    replyComments: [
      {
        id: 2,
        text: 'Cảm ơn bạn nhiều nha <3 love',
        updateAt: '1th5 21:44',
        userName: 'Nguyễn Trường An',
        emoji: EMOJI_COMMENT.haha,
        emojiQuantity: 8,
        replyComments: [],
      },
      {
        id: 5,
        text: 'Cảm ơn bạn nhiều nha <3 love',
        updateAt: '1th5 21:44',
        userName: 'Nguyễn Trường An',
        emoji: EMOJI_COMMENT.haha,
        emojiQuantity: 8,
        replyComments: [],
      },
    ],
  },
  {
    id: 3,
    text: 'Bài code này khó quá, thằng nào tạo ra nó vậy????',
    updateAt: '1th5 21:47',
    userName: 'Trần Văn An',
    emoji: EMOJI_COMMENT.angry,
    emojiQuantity: 5,
    replyComments: [
      {
        id: 4,
        text: 'T tạo nè m có ý kiến gì hemmm thằng đần này????',
        updateAt: '1th5 21:48',
        userName: 'Nguyễn Đình Quốc Duy',
        emoji: EMOJI_COMMENT.humm,
        emojiQuantity: 1,
        replyComments: [
          {
            id: 6,
            text: 'Cảm ơn bạn nhiều nha <3 love',
            updateAt: '1th5 21:44',
            userName: 'Nguyễn Trường An',
            emoji: EMOJI_COMMENT.haha,
            emojiQuantity: 8,
            replyComments: [],
          },
        ],
      },
    ],
  },
];

export const FILTER_DEFAULT = {
  userId: '1',
  pageNumber: '0',
  limit: LIMIT_ROW_PROBLEMS_TABLE,
  status: 'ALL',
  difficulty: 'ALL',
  topic: 'ALL',
  searchTerm: '',
};

export const PROBLEM_INIT = {
  id: null,
  ownerId: null,
  title: '',
  description: '',
  point: 0,
  difficulty: DIFFICULTY_DEFAULT[0],
  topics: [],
  acceptedCount: 0,
  discussCount: 0,
  submissionCount: 0,
  acceptanceRate: 0,
  type: null,
  deleted: false,
  functionName: '',
  outputDataType: '',
};

export const ACTION = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
};

export const DATATYPE_DEFAULT = [
  'int',
  'int[]',
  'long',
  'long[]',
  'float',
  'float[]',
  'double',
  'double[]',
  'char',
  'char[]',
  'String',
  'String[]',
  'boolean',
  'boolean[]',
];
