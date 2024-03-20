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

    //logout button
    const link = document.createElement('a');
    link.href = '#';
    link.innerHTML = "Log Out";
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
