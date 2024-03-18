import api from './APIClient.js';

// Get id from URL
const query = window.location.search;
let parameters = new URLSearchParams(query);
let id = parameters.get('id');
const avatarDiv = document.getElementById('avatar');
const userInfoDiv = document.getElementById('userInfo');
const userBanner = document.getElementById('userBanner');
let isCurrentUser = false;
let isFollowing = false;
api.getCurrentUser().then(current => {
    if (current.id == id){
        isCurrentUser = true;
    } else {
        api.getUsersFollowing(current.id).then(following => {
            following.forEach(follower => {
                console.log("Follower", follower);
                console.log("ID", id);
                if(follower == id){
                    isFollowing = true;
                    console.log("is FOLLOWING", isFollowing);
                    //load button here
                }
            })
        })
    }
    console.log(isCurrentUser);

})
api.getUsersById(id).then(user => {
    const avatar = document.createElement('img');
    avatar.src = user.avatar;
    avatar.alt = 'User Avatar';
    avatarDiv.appendChild(avatar);
    const name = document.createElement('h3');
    name.innerHTML = `${user.first_name} ${user.last_name}`;
    userInfoDiv.appendChild(name);
    const username = document.createElement('h4');
    username.innerHTML = user.username;
    userInfoDiv.appendChild(username);
    if(!isCurrentUser){
        console.log(isFollowing);
        //put up higher in js
        if(!isFollowing){
            const follow = document.createElement('button');
            follow.innerHTML = 'Follow';
            userBanner.appendChild(follow);
        } else {
            const unfollow = document.createElement('button');
            unfollow.innerHTML = 'Unfollow';
            userBanner.appendChild(unfollow);
        }
        
    }

})
