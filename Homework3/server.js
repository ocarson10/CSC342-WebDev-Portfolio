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
app.post('/formdata', upload.single('image'), (req, res) => {
    if(isFormDataValid(req)){
        console.log(req.file);
        res.sendFile(html_dir + 'success.html');
    } else {
        res.sendFile(html_dir + 'error.html')
    }
    // res.sendFile(html_dir + 'success.html');
})
function isFormDataValid(req) {
    // Add your validation logic here
    // For example, check if required fields are present, or validate the uploaded image
    // For demonstration purposes, let's assume the form is valid if the image field is present
    if(req.file !== undefined && req.query !== undefined){
        return true;
    } else{
        return false;
    }
}
