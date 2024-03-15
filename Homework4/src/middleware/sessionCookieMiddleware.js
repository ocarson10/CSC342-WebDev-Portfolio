
const sessions = {};


module.exports = (req, res, next) => {
  if(!req.cookies['Howler']) { //No cookie; new user
    let newSessionID = generateSessionId();
    sessions[newSessionID] = generateEmptySession();
    req.session = sessions[newSessionID]; //store session object in the request
    res.cookie('Howler', newSessionID); //send session ID in cookie to client
    console.log('We have a new visitor!', req.session);
  }
  else {//Existing user; read cookie
    let sessionId = req.cookies['Howler'];
  
    console.log('Oh look,', sessionId, 'is back!');
    if(!sessions[sessionId]) {
      //This happens if the client has a cookie from before our server restarted
      //We need to create a new entry for this user
      sessions[sessionId] = generateEmptySession();
    }
    req.session = sessions[sessionId] //store session object in the request
  }
  next(); //Make sure we call the next middleware
}


function generateEmptySession() {
  return {
    user: null,
    HowlsPosted: []
  }
}

function generateSessionId() {
  let newSessionID = "";
  newSessionID += Math.random();
  newSessionID += Math.random();
  newSessionID += Math.random();
  return newSessionID;
}
