import axios from 'axios';

const CONTEST_ENROLL_API_URL = `${process.env.REACT_APP_BASE_API_URL}/api/contest-enrollments`;

const addEnrollment = async (contestEnrollment) => {
  try {
    const restUrl = `${CONTEST_ENROLL_API_URL}/add-enrollment`;
    const response = await axios.post(restUrl, contestEnrollment);

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

const updateEnrollment = async (contestEnrollment) => {
  try {
    const restUrl = `${CONTEST_ENROLL_API_URL}/update-enrollment`;
    const response = await axios.put(restUrl, contestEnrollment);

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

const deleteEnrollment = async (contestEnrollmentId) => {
  try {
    const restUrl = `${CONTEST_ENROLL_API_URL}/delete-enrollment/${contestEnrollmentId}`;
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

const getEnrollments = async (contestId, page, size) => {
  const apiUrl = `${CONTEST_ENROLL_API_URL}/get-enrollments?contestId=${contestId}&page=${page}&size=${size}`;
  const response = await axios.get(apiUrl);
  return response.data;
};

const getParticipantsByContest = async (contestId) => {
  const apiUrl = `${CONTEST_ENROLL_API_URL}/get-participants-by-contest?contestId=${contestId}`;
  const response = await axios.get(apiUrl);
  return response.data;
};

const getUsersToInviteByName = async (contestId, nameToSearch, page = 0, size = 10) => {
  const apiUrl = `${CONTEST_ENROLL_API_URL}/get-users-to-invite-by-name?` + 
    `contestId=${contestId}&nameToSearch=${nameToSearch}&page=${page}&size=${size}`;
  const response = await axios.get(apiUrl);
  return response.data;
};

const inviteUser = async (contestId, userId) => {
  try {
    const restUrl = `${CONTEST_ENROLL_API_URL}/invite-user?contestId=${contestId}&userId=${userId}`;
    const response = await axios.post(restUrl);

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

const ContestEnrollmentService = {
  addEnrollment,
  updateEnrollment,
  deleteEnrollment,
  getEnrollments,
  getParticipantsByContest,
  getUsersToInviteByName,
  inviteUser
};

export default ContestEnrollmentService;