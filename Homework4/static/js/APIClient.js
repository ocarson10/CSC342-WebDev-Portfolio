const API_BASE = '/api';

class HTTPClient {
  static get(url) {
    return fetch(`${API_BASE}${url}`)
    .then(res => {
        if(res.ok) {
          return res.json();
        }
        throw new Error('Network response was not ok.');
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }

  static post(url, data) {
    // TODO: Implement
  }

  static put(url, data) {
    // TODO: Implement
  }

  static delete(url) {
    // TODO: Implement
  }
};



const getHowlsById = (id) => {
  return HTTPClient.get(`/howls/${id}`);
};

const getFollowersHowls = () => {
  return HTTPClient.get(`/followers/howls`);
};

const getCurrentUser = () => {
  return HTTPClient.get('/users/current');
};

const getUsersById = (id) => {
  return HTTPClient.get(`/users/${id}`);
};

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
};
