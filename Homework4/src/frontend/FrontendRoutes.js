const express = require('express');
const frontendRouter = express.Router();
const UserDAO = require('../api/db/UserDAO');
const bodyParser = require('body-parser');

frontendRouter.use(express.static('static'));
frontendRouter.use(bodyParser.urlencoded({ extended: false }));
frontendRouter.use(bodyParser.json());


const path = require('path');
const html_dir = path.join(__dirname, '../../src/templates/');

frontendRouter.get('/', (req, res) => {
    res.sendFile(`${html_dir}index.html`);
  });
  frontendRouter.get('/login', (req, res) => {
    res.sendFile(`${html_dir}login.html`);
  });
frontendRouter.post('/login', (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    
    UserDAO.getUserByUsername(username)
    .then(user => {
        console.log(req.session);
        req.session.user = user;
        console.log(req.session);
        res.cookie('Howler', user);
        res.redirect(302, '/dashboard');
    })
    .catch(error => {
        console.error('Invalid login:', error);
        res.status(401).send('Invalid user');
    })
    
})
frontendRouter.get('/dashboard', (req, res) => {
    const Howler = req.cookies.Howler ? req.cookies.Howler:null;
    const username = Howler ? Howler.username: null;
    if(username){
        res.sendFile(`${html_dir}dashboard.html`, {username});
       
    }else {
        res.sendFile(`${html_dir}login.html`, {username});
       
    }
    console.log(req.cookies);
    
  });

frontendRouter.get('/logout', (req, res) => {
    // res.sendFile(`${html_dir}dashboard.html`);
    req.session.user = null;
    res.clearCookie('Howler');
    res.redirect(302, '/');
  });
module.exports = frontendRouter;
