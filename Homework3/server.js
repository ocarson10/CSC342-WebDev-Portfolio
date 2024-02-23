const express = require('express');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const fs = require('fs');


const app = express();

const PORT = 80;
const html_dir = __dirname + "/templates/";


app.listen(PORT, () => console.log(`Sever listening on port: ${PORT}`));

// Set up Middleware
app.use(express.static('static'));
app.use(express.urlencoded({extended: true}));


app.get('/', (req,res) =>{
    res.sendFile(html_dir + 'form.html');
})
app.post('/send', upload.single('image'), (req, res) => {
    if(isFormDataValid(req)){
        res.sendFile(html_dir + 'success.html');
    } else {
        fs.unlink(req.file.path, (err) => {
            if(err){
                console.error('image could not be deleted:', err);
                return res.status(500).send('error removing image');
            }
            console.log('The image was deleted');
            res.sendFile(html_dir + 'error.html');
        })
        
    }
    
})
function isFormDataValid(req) {
    
    console.log(req.body);

    if(req.file !== undefined && isValidName(req) === true){
        return true;
    } else{
        return false;
    }
}
function isValidName(req){
    var firstSender = req.body.firstName.toUpperCase();
    var lastSender = req.body.lastName.toUpperCase();
    var firstRecipient = req.body.firstNameRec.toUpperCase();
    var lastRecipient = req.body.lastNameRec.toUpperCase();
    if((firstSender === 'STU' || firstSender === 'STUART')  && lastSender === 'DENT'){
        return false;
    } else if ((firstRecipient === 'STU' || firstRecipient === 'STUART') && lastRecipient == 'DENT'){
        return false;
    } else{
        return true;
    }

}
