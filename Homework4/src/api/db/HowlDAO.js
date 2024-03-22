let howls = require('../../data/howls.json');
let users = require('../../data/follows.json');
 
function sortHowls(a, b) {
    const dateA = new Date(a.datetime);
    const dateB = new Date(b.datetime);
    return dateB - dateA; 
}

howls = howls.sort(sortHowls);
console.log("SORTED:", howls);

module.exports = {
    getHowls: () => {
        return new Promise((resolve, reject) => {
            resolve(Object.values(howls));
        });
    },
    
    getHowlById: (howlId) => {
        return new Promise((resolve, reject) => {
            const howl = howls[howlId];
            if(howl){
                resolve(howl);
            } else {
                reject();
            }
        });
    },

    getHowlByUser: (userId) => {
        return new Promise((resolve, reject) => {
            
          let howlArray = Object.values(howls);
            console.log(userId);
          let  howlsByUser = howlArray.filter(howl => howl.userId == userId);
          console.log(howlsByUser);
            if(howlsByUser){
                resolve(howlsByUser);
            } else {
                reject(new Error('Howls not Found'));
            }
          
        });
    },

    getHowlByFollowing: (userId) => {
        return new Promise((resolve, reject) => {
            const following = users[userId].following;
            const howlsByFollowing = [];
            howls.forEach(howl => {
                following.forEach(follower => {
                    if(howl.userId == follower && !howlsByFollowing.includes(howl)){
                        howlsByFollowing.push(howl);
                    } else if (howl.userId == userId && !howlsByFollowing.includes(howl)){
                        console.log(howl.userId, userId);
                        howlsByFollowing.push(howl);
                    }
                })
            })
                resolve(howlsByFollowing);
          
        });
    },

    createHowl: (message, date, user) => {
        return new Promise((resolve, reject) => {
            let id = Object.keys(howls).length + 1;
            const howl = {
                id: id,
                userId: user,
                datetime: date,
                text: message
            }
            //howls[id] = howl;
            howls.unshift(howl);
            resolve(howl);
        });
    },
}
