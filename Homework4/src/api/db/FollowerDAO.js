let users = require('../../data/follows.json');

module.exports = {
    getFollowers: () => {
        return new Promise((resolve, reject) => {
            resolve(Object.values(users));
        });
    },
    
    //gets who follows a specific user
    getFollowersByUser: (userId) => {
        return new Promise((resolve, reject) => {
            const followers = [];
            users.forEach(user => {
               user.following.forEach(follower => {
                if(follower = userId){
                    followers.push(follower);
                }
               })
            })
                resolve(followers);
          
        });
    },

    //gets following of a specific user
    getUsersFollowing: (userId) => {
        return new Promise((resolve, reject) => {
            const following = users[userId].following;
            resolve(following);
            // users.forEach(user => {
            //     if(user.userId == userId){
            //         resolve(user.following);
            //     }
            // })
             
        
        });
    },

    FollowUser: (currentUserId, followerUserId) => {
        return new Promise((resolve, reject) => {
            let following = users[currentUserId].following;
            following.push(parseInt(followerUserId));
            users[currentUserId].following = following;

             resolve(users);
          
        });
    },

    UnfollowUser: (currentUserId, followerUserId) => {
        return new Promise((resolve, reject) => {
            let following = users[currentUserId].following;
            following = following.filter(follower => follower != followerUserId);
            users[currentUserId].following = following;

             resolve(users);
          
        });
    }

 
}
