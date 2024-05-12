import axios from 'axios';

const CONTEST_API_URL = `${process.env.REACT_APP_BASE_API_URL}/api/contests`;

const addContest = async (contest) => {
  try {
    const restUrl = `${CONTEST_API_URL}/add-contest`;
    const response = await axios.post(restUrl, contest);

    if (response.status === 201) {
      console.log('Add successful');
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Add failed', error);
    return false;
  }
};

const updateContest = async (contest) => {
  try {
    const restUrl = `${CONTEST_API_URL}/update-contest`;
    const response = await axios.put(restUrl, contest);

    if (response.status === 200) {
      console.log('Update successful');
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Update failed', error);
    return false;
  }
};

const updateContestStatus = async (contestId, contestStatus) => {
  try {
    const restUrl = `${CONTEST_API_URL}/update-contest`;
    const response = await axios.put(restUrl, {
      contestId: contestId,
      contestStatus: contestStatus,
    });

    if (response.status === 200) {
      console.log('Update status successful');
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Update status failed', error);
    return false;
  }
};

const deleteContest = async (contestId) => {
  try {
    const restUrl = `${CONTEST_API_URL}/delete-contest/${contestId}`;
    const response = await axios.delete(restUrl);

    if (response.status === 200) {
      console.log('Update successful');
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Update failed', error);
    return false;
  }
};

const getMyContests = async (userId, page = 1, size = 10) => {
  const apiUrl = `${CONTEST_API_URL}/get-my-contests?userId=${userId}&page=${page}&size=${size}`;
  const response = await axios.get(apiUrl);
  return response.data;
};

const getGlobalContests = async (userId, page = 1, size = 10) => {
  const apiUrl = `${CONTEST_API_URL}/get-global-contests?userId=${userId}&page=${page}&size=${size}`;
  const response = await axios.get(apiUrl);
  return response.data;
};

const ContestService = {
  addContest,
  updateContest,
  updateContestStatus,
  deleteContest,
  getMyContests,
  getGlobalContests
};

export default ContestService;
