import api from './APIClient.js';

//Could be added to common.js page for all main pages, start of section
const header = document.getElementById('userInformation');
api.getCurrentUser().then(user => {
    
    console.log('THIS IS USER', user.username);
    document.getElementById('username').innerHTML = `${user.first_name} ${user.last_name}!`;
    const avatarLink = document.createElement('a');
    avatarLink.href = '/profile?id=' + user.id;
    const avatar = document.createElement('img');
    avatar.src = `${user.avatar}`;
    avatar.alt = 'User Avatar';
    const AvatarBg = document.createElement('div');
    AvatarBg.appendChild(avatar);
    AvatarBg.classList.add('avatar-bg');
    avatarLink.appendChild(AvatarBg);
    avatarLink.classList.add('Profile-img');
    const userPhoto = document.getElementById('Userphoto');
    userPhoto.appendChild(avatarLink);

    //logout button
    const link = document.createElement('a');
    link.href = '#';
    link.innerHTML = "Log Out";
    link.className ="btn btn-outline-danger";
     link.addEventListener("click", e => {
    e.preventDefault();
    api.logOut().then(() => {
      document.location = "./login";
    });
  })
  header.appendChild(link);


 
}).catch(error => {
    if(error.status === 401) { //if we try to get current user and we are not logged in, redirects to login page
        console.log("We are not logged in");
        document.location = './login';
      }
      else {
        console.log(`${error.status}`, error);
      }
})
//end of section
