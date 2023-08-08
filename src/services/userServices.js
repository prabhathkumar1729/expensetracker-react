import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'https://localhost:7220/api/User/',
});

const getProfile = async (userId) => {
  const request = await apiInstance.get(`getUserDetails/${userId}`);
  return request.data;
};

const registerUser = async (user) => {
  const request = await apiInstance.post('register', user);
  return request.data;
};

const isEmailUnique = async (email) => {
  const request = await apiInstance.get(`unique-user-email/${email}`);
  return request.data;
};

const loginUser = async (user) => {
  const request = await apiInstance.post('login', user);
  return request.data;
};

const getUserSecurityQuestion = async (email) => {
  const request = await apiInstance.get(`getUserSecurityQuestion/${email}`);
  return request.data;
};

const isUserSecurityAnswerValid = async (user) => {
  const request = await apiInstance.post('isUserSecurityAnswerValid', user);
  return request.data;
};

const resetPassword = async (user) => {
  const request = await apiInstance.post('changeUserPassword', user);
  return request.data;
};

const userServices = {
  getProfile,
  registerUser,
  isEmailUnique,
  loginUser,
  getUserSecurityQuestion,
  isUserSecurityAnswerValid,
  resetPassword,
};

export default userServices;
