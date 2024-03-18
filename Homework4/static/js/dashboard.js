import api from './APIClient.js';

const howlsMain = document.getElementById('howls');

//Could be added to common.js page for all main pages, start of section
const header = document.getElementById('header');
api.getCurrentUser().then(user => {
    console.log('THIS IS USER', user.username);
    document.getElementById('username').innerHTML = `${user.username}`;
    const avatar = document.createElement('img');
    avatar.src = `${user.avatar}`;
    avatar.alt = 'User Avatar';
    header.appendChild(avatar);

}).catch(() => {
    // document.location = "/error";
    console.log("error");
})
//end of section


api.getFollowersHowls().then(howls =>{
    howls.forEach(howl => {
        const postAvatar = document.createElement('img');
        postAvatar.alt = "User Avatar";
        const postUser = document.createElement('h4');
        const postName = document.createElement('h3');
        api.getUsersById(howl.userId).then(user =>{
            postUser.innerHTML = `@${user.username}`;
            postAvatar.src = user.avatar;
            postName.innerHTML = `${user.first_name} ${user.last_name}`

        })
       
        console.log("HOWLS:",howl);
        const div = document.createElement('div');
        const date = document.createElement('p');
        div.append(postAvatar);
        div.append(postName);
        div.append(postUser);
        date.innerHTML = howl.datetime;
        div.append(date);
        const paragraph = document.createElement('p');
        paragraph.innerHTML = howl.text;
        div.append(paragraph);
        howlsMain.append(div);
    })
})
