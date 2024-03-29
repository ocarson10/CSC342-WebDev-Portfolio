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
    api.getUsersById(id).then(user => {
        const avatar = document.createElement('img');
        avatar.src = user.avatar;
        avatar.alt = 'User Avatar';
        const AvatarBg = document.createElement('div');
        AvatarBg.appendChild(avatar);
        AvatarBg.classList.add('avatar-bg-main');
        avatarDiv.appendChild(AvatarBg);
        const name = document.createElement('h3');
        name.innerHTML = `${user.first_name} ${user.last_name}`;
        userInfoDiv.appendChild(name);
        const username = document.createElement('h4');
        username.innerHTML = `@${user.username}`;
        userInfoDiv.appendChild(username);
        if(!isCurrentUser){
            console.log(isFollowing);
            //put up higher in js
            const followButton = document.createElement('button');

            if(!isFollowing){
                followButton.innerHTML = 'Follow';
                followButton.classList.remove('unfollow');
                followButton.classList.add('follow');
               
               
            } else {
                followButton.innerHTML = 'Unfollow';
                followButton.classList.remove('follow');
                followButton.classList.add('unfollow');
              
            }
            userBanner.appendChild(followButton);
            followButton.addEventListener("click", e => {
                if (followButton.innerHTML == 'Unfollow'){
                    //unfollow user
                    followButton.innerHTML = 'Follow';
                    isFollowing = false;
                    
                    api.unfollowUser(current.id, id).then(() => {
                        location.reload();
                    })
                    //api route to handle removed follower
                } else {
                    followButton.innerHTML = 'Unfollow';
                    isFollowing = true;
                    
                    //api route to handle added follower
                    api.followUser(current.id, id).then(() => {
                        location.reload();
                    })
                }
                
            })
        }

        api.getUsersFollowing(user.id).then(userFollowing => {
            console.log("This is the users FOLLOWING", userFollowing);
        userFollowing.forEach(follower => {
            api.getUsersById(follower).then(userFollower => {
                const link = document.createElement('a');
                 link.href = '/profile?id=' + userFollower.id;
                const div = document.createElement('div');
                const avatar = document.createElement('img');
                avatar.src = userFollower.avatar;
                avatar.alt = "User Avatar";
                const AvatarBg = document.createElement('div');
                AvatarBg.appendChild(avatar);
                AvatarBg.classList.add('avatar-bg');
                link.appendChild(AvatarBg);
                
                const usersName = document.createElement('h3');
                 usersName.innerHTML = `${userFollower.first_name} ${userFollower.last_name}`;
                link.appendChild(usersName);
                const usertag = document.createElement('h4');
                usertag.innerHTML =    `@${userFollower.username}`;
                link.appendChild(usertag);
                div.appendChild(link);
                div.classList.add('card');
                div.classList.add('howl-card');
                document.getElementById('follower-body').appendChild(div);
            })
        })

        })
        
    
    })

    api.getHowlsById(id).then(howls => {
        howls.forEach(howl => {
            const link = document.createElement('a');
            link.href = '/profile?id=' + howl.userId;
            const postAvatar = document.createElement('img');
            postAvatar.alt = "User Avatar";
            const postUser = document.createElement('h4');
            const postName = document.createElement('h3');
            api.getUsersById(howl.userId).then(user =>{
                postUser.innerHTML = `@${user.username}`;
                postAvatar.src = user.avatar;
                postName.innerHTML = `${user.first_name} ${user.last_name}`;
    
            })
           const AvatarBg = document.createElement('div');
            AvatarBg.appendChild(postAvatar);
            AvatarBg.classList.add('avatar-bg');
            console.log("HOWLS:",howl);
            const div = document.createElement('div');
            const date = document.createElement('p');
            link.append(AvatarBg);
           
            link.append(postName);
            link.append(postUser);
            div.append(link);
            const tempDate = new Date(howl.datetime);
        let hours = (tempDate.getUTCHours() +20) % 24; // Get the hour (0-23)
        let endTime = "";
        if(hours > 12){
            endTime ="pm";
            hours = hours - 12;
        } else if(hours == 12){
            endTime ="pm";
        } else{
            if(hours == 0){
                hours+=12;
            }
            endTime="am"
        }
        
        const minutes = tempDate.getUTCMinutes().toString().padStart(2, '0'); // Get the minutes (0-59)
        
        date.innerHTML = `${tempDate.toDateString()} ${hours}:${minutes}${endTime}`; //make human readable
        date.classList.add('dateSection');
            div.append(date);
            const paragraph = document.createElement('p');
            paragraph.innerHTML = howl.text;
            paragraph.classList.add('paragraph');
            div.append(paragraph);
            div.classList.add('card');
            div.classList.add('howl-card');
            document.getElementById('howls').append(div);
        })
        
    })


})
