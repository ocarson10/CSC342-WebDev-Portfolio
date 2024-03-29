let users = require('../../data/users.json');
const crypto = require('crypto');

module.exports = {
    getUserByCredentials: (username, password) => {
        return new Promise((resolve, reject) => {
          const user = Object.values(users).find(user => user.username == username);
          if (user) { // we found our user
            crypto.pbkdf2(password, user.salt, 100000, 64, 'sha512', (err, derivedKey) => {
              if (err) { //problem computing digest, like hash function not available
                reject({code: 400, message: "Error: " +err});
              }
    
              const digest = derivedKey.toString('hex');
              if (user.password == digest) {
                resolve(getFilteredUser(user));
              }
              else {
                reject({code: 401, message: "Invalid username or password"});
              }
            });
          }
          else { // if no user with provided username
            reject({code: 401, message: "No such user"});
          }
        })
    
      },

    getUsers: () => {
        return new Promise((resolve, reject) => {
            resolve(Object.values(users));
        });
    },
    
    getUserById: (userId) => {
        return new Promise((resolve, reject) => {
            const user = users[userId];
            if(user){
                resolve(user);
            } else {
                reject();
            }
        });
    },

    getUserByUsername: (username) => {
        return new Promise((resolve, reject) => {
            let usersArray = Object.values(users);
            let user = usersArray.find(u => u.username === username);
            if(user){
                resolve(user);
            } else {
                reject({code: 401, message: "No such user"});
            }
        });
    },

    
};
function getFilteredUser(user) {
    return {
      "id": user.id,
      "first_name": user.first_name,
      "last_name": user.last_name,
      "username": user.username,
      "avatar": user.avatar
    }
  }
  