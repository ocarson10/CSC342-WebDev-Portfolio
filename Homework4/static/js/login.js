import api from './APIClient.js';

const loginButton = document.querySelector('#loginButton');
const username = document.querySelector('#username');

const errorBox = document.querySelector('#errorbox');


loginButton.addEventListener('click', e => {

  errorBox.classList.add("hidden");

  api.logIn(username.value).then(userData => {
    document.location = "./"; //login successful, get the homepage
  }).catch((err) => {
    errorBox.classList.remove("hidden");
    if(err.status === 401) {
      errorBox.innerHTML = "Invalid username or password"; //else error box appears
    }
    else {
      errorBox.innerHTML = err;
    }
  });
});
