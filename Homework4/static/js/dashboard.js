import api from './APIClient.js';

const howlsMain = document.getElementById('howls');




api.getFollowersHowls().then(howls =>{
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
            postName.innerHTML = `${user.first_name} ${user.last_name}`

        })
       
        console.log("HOWLS:",howl);
        const div = document.createElement('div');
        const date = document.createElement('p');
        link.append(postAvatar);
        div.append(link);
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
