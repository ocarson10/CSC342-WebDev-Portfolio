import HTTPClient from "./HTTPClient.js";

const API_BASE = '/api';


const getHowlsById = (id) => {
  return HTTPClient.get(`${API_BASE}/howls/${id}`);
};

const getFollowersHowls = () => {
  return HTTPClient.get(`${API_BASE}/followers/howls`);
};

const getCurrentUser = () => {
  return HTTPClient.get(`${API_BASE}/users/current`);
};

const getUsersById = (id) => {
  return HTTPClient.get(`${API_BASE}/users/${id}`);
};

const getVisitedUsers = () => {
  return HTTPClient.get(`${API_BASE}/users/current/profiles`);
};

const getUsersFollowing = (id) => {
  return HTTPClient.get(`${API_BASE}/following/${id}`);
};
const logIn = (username, password) => {
  const data = {
    username: username,
    password: password
  }
  return HTTPClient.post(`${API_BASE}/users/login`, data);
};
const logOut = () => {
  return HTTPClient.post(`${API_BASE}/users/logout`, {});
};

const followUser = (currentUserId ,userId) => {

  return HTTPClient.put(`${API_BASE}/following/${currentUserId}/follows/${userId}`);
};

const unfollowUser = (currentUserId ,userId) => {
  return HTTPClient.delete(`${API_BASE}/following/${currentUserId}/follows/${userId}`);

};

const createHowl = (message, date, user) => {
  const data = {
    message: message,
    date: date,
  }
  return HTTPClient.post(`${API_BASE}/howls/${user}`, data);
}
// const getParksByCountyId = (countyId) => {
//   if(countyId == "all") {
//     return getParks();
//   }
//   return HTTPClient.get(`/counties/${countyId}/parks`);
// };



export default {
 getHowlsById,
 getFollowersHowls,
 getCurrentUser,
 getUsersById,
 getVisitedUsers,
 getUsersFollowing,
 logIn,
 logOut,
 followUser,
 unfollowUser,
 createHowl
};
