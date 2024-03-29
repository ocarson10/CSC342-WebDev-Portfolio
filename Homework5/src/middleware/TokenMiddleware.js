const { Buffer } = require('buffer');
const crypto = require('crypto');
require('dotenv').config();
const TOKEN_COOKIE_NAME = "HowlerToken";
// In a real application, you will never hard-code this secret and you will
// definitely never commit it to version control, ever
//crypto nodejs package can be used to create secret key, store in env variable .env file
const API_SECRET = process.env.API_SECRET;

exports.TokenMiddleware = (req, res, next) => {
  // We will look for the token in two places:
  // 1. A cookie in case of a browser
  // 2. The Authorization header in case of a different client
  let token = null;
  if(!req.cookies[TOKEN_COOKIE_NAME]) {
    //No cookie, so let's check Authorization header
    const authHeader = req.get('Authorization');
    if(authHeader && authHeader.startsWith("Bearer ")) {
      //Format should be "Bearer token" but we only need the token
      token = authHeader.split(" ")[1].trim();
    }
  }
  else { //We do have a cookie with a token
    token = req.cookies[TOKEN_COOKIE_NAME]; //Get session Id from cookie
  }

  if(!token) { // If we don't have a token
    res.status(401).json({error: 'Not authenticated'});
    return;
  }

  //If we've made it this far, we have a token. We need to validate it

  try {
    const decoded = verify(token, API_SECRET);
    req.user = decoded.user;
    next(); //Make sure we call the next middleware
  }
  catch(err) { //Token is invalid
    res.status(401).json({error: 'Not authenticated'});
    return;
  }


}


exports.generateToken = (req, res, user) => {
  let data = {
    user: user,
    // Use the exp registered claim to expire token in 1 hour
    exp: Math.floor(Date.now() / 1000) + (60 * 60)
  }

  const token = sign(data, API_SECRET);

  //send token in cookie to client
  res.cookie(TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    maxAge: 2 * 60 * 1000 //This session expires in 2 minutes.. but token expires in 1 hour!
  });
};


exports.removeToken = (req, res) => {
  //send session ID in cookie to client
  res.cookie(TOKEN_COOKIE_NAME, "", {
    httpOnly: true,
    secure: true,
    maxAge: -360000 //A date in the past
  });

}
 function sign(data, secret){
     //create header
        const header = {
          "alg": "HS256",
          "typ": "JWT"
        };
        const headerString = JSON.stringify(header);
        const headerEncoded = base64urlEncode(headerString);
     //create payload
        const dataString = JSON.stringify(data);
        const dataEncoded = base64urlEncode(dataString);
     //create signature
        const headerPayload = headerEncoded + '.' + dataEncoded;
        const signature = crypto.createHmac('sha256', secret).update(headerPayload).digest();
        const signatureEncoded = base64urlEncode(signature);

    const webToken = `${headerPayload}.${signatureEncoded}`;
    return webToken;
 }

 function verify(token, secret){
  const splitToken = token.split('.');
  const headerEncoded = splitToken[0];
  const headerDecoded = base64urlDecode(headerEncoded);
  const payloadEncoded = splitToken[1];
  const payloadDecoded = base64urlDecode(payloadEncoded);
  const signatureEncoded = splitToken[2];
  
  const headerPayload = headerEncoded + '.' + payloadEncoded;
  const tokenSignature = crypto.createHmac('sha256', secret).update(headerPayload).digest();
  const tokenSignatureEncoded = base64urlEncode(tokenSignature);


  if(tokenSignatureEncoded === signatureEncoded){
    const decoded = {
      header: headerDecoded,
      user: JSON.parse(payloadDecoded).user,
    }
    return decoded;
  } else {
    throw new Error('Signature Invalid');
  }

 }
 function base64urlEncode(string) {
  return Buffer.from(string, 'utf8').toString('base64url');
}

function base64urlDecode(string) {
  return Buffer.from(string, 'base64url').toString('utf8');
}
