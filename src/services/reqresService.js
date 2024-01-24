import axios from "axios";

const BASE_URL = "https://reqres.in/api/users";

export const fetchAllUsers = async () => {
  return axios.get(`${BASE_URL}`).then((resp) => resp.data.data);
};

export const addUser = async (user) => {
  return await axios.post(`${BASE_URL}`, user).then((resp) => resp.data);
};

export const deleteUserApi = async (userId) => {
  return await axios.delete(`${BASE_URL}/${userId}`);
};

export const getUserById = async (userId) => {
  return axios.get(`${BASE_URL}/${userId}`).then((resp) => resp.data);
};

export const editUserById = async (userId, user) => {
  const filteredUserData = Object.fromEntries(
    Object.entries(user).filter(([, value]) => !!value)
  );

  return axios
    .get(`${BASE_URL}/${userId}`, filteredUserData)
    .then((resp) => resp.data);
};
