const express = require('express');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

const app = express();

const PORT = 80;
const html_dir = __dirname + "/templates/";

//app.use(express.static('public'));

app.listen(PORT, () => console.log(`Sever listening on port: ${PORT}`));

// Set up Middleware
app.use(express.static('static'));
app.use(express.urlencoded({extended: true}));

app.get('/', (req,res) =>{
    res.sendFile(html_dir + 'form.html');
})
app.get('/formdata', (req, res) => {
    
    console.log("query ", req.query);
    res.sendFile(html_dir + 'success.html');
})
