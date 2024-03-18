import api from './APIClient.js';

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
