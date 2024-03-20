
const sessions = {};


exports.SessionMiddleware = (req, res, next) => {
  if(!req.cookies['Howler']) { //No cookie; new user
    res.status(401).json({error: 'Not authenticated'});
    return;
  }
  else {//Existing user; read cookie
    let sessionId = req.cookies['Howler'];
  
    console.log('Oh look,', sessionId, 'is back!');
    console.log('THIS IS YOUR COOKIE' ,req.cookies['Howler']);
    if(!sessions[sessionId]) {
      this.removeSession(req, res); //remove the cookie
      res.status(401).json({error: 'Not authenticated'});
      return;
    } else {
      req.session = sessions[sessionId] //store session object in the request
      console.log('THIS IS YOUR SESSION' ,req.session);
      next(); //Make sure we call the next middleware
    }
    
  }
 
}


exports.initializeSession = (req, res, user) => {
  let sessionId = generateSessionId();
  let sessionData = {
    user: user,
    visitedUsers: []
  }
  res.cookie('Howler', sessionId, {
    httpOnly: true,
    secure: true,
    maxAge: 5 * 60 * 1000 //This session expires in 5 minutes, logs out after that time upon refresh
  });
  sessions[sessionId] = sessionData; //Associate ID with data
};

exports.removeSession = (req, res) => {
  let sessionId = req.cookies['Howler'];
  if(sessionId) {
    delete sessions[sessionId];
  }
  //send session ID in cookie to client
  res.cookie('Howler', "", {
    httpOnly: true,
    secure: true,
    maxAge: -360000 //A date in the past
  });

}

function generateSessionId() {
  let newSessionID = "";
  newSessionID += Math.random();
  newSessionID += Math.random();
  newSessionID += Math.random();
  return newSessionID;
}
