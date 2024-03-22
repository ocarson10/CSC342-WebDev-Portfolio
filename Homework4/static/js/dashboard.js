import api from './APIClient.js';

const howlsMain = document.getElementById('howls');

const HowlInput = document.getElementById('floatingTextarea2');
const HowlBtn = document.getElementById('howlBtn');


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
        
        link.append(postName);
        link.append(postUser);
        div.append(link);
        const tempDate = new Date(howl.datetime);
        let hours = (tempDate.getUTCHours() + 20) % 23; // Get the hour (0-23)
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
        const minutes = tempDate.getUTCMinutes(); // Get the minutes (0-59)
        

        date.innerHTML = `${tempDate.toDateString()} ${hours}:${minutes}${endTime}`; //make human readable
        div.append(date);
        const paragraph = document.createElement('p');
        paragraph.innerHTML = howl.text;
        div.append(paragraph);
        howlsMain.append(div);
    })

    //handle howl modal
    HowlBtn.addEventListener("click", e => {
        e.preventDefault();
        api.getCurrentUser().then(user => {
            const userId = user.id;
            const message = HowlInput.value;
            const date = new Date().toISOString().split('.')[0] + 'Z';
            api.createHowl(message, date, userId).then(() => {
                location.reload();
            })
        })
    })
   
})
