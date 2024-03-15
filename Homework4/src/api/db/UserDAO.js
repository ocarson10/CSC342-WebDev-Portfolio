let users = require('../../data/users.json');

module.exports = {
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
                reject(new Error('User not Found'));
            }
        });
    }
}
