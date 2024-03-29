const express = require('express');
const cookieParser = require('cookie-parser');
const apiRouter = express.Router();

const UserDAO = require('./db/UserDAO');
const FollowerDAO = require('./db/FollowerDAO');
const HowlDAO = require('./db/HowlDAO');



apiRouter.use(cookieParser());
apiRouter.use(express.json());

const {TokenMiddleware, generateToken, removeToken} = require('../middleware/TokenMiddleware');


//Getting howls posted by a specific user
apiRouter.get('/howls/:userId', TokenMiddleware,(req,res) => {
    const userId = req.params.userId;
    HowlDAO.getHowlByUser(userId).then(howls => {
        if(howls){
            res.json(howls);
        } else {
            res.status(404).json({error: 'No Howls found'});
        }
        
    })  
    .catch(err => {
        res.status(500).json({error: 'Internal server error'});
    })  
});

apiRouter.post('/howls/:userId', TokenMiddleware, (req,res) => {
    const userId = req.params.userId;
    const message = req.body.message;
    const date = req.body.date;
    HowlDAO.createHowl(message, date,userId).then( () =>{

        res.status(200).json({ message: 'Howl succsesfully created' });

       
    }) 
    .catch(err => {
        res.status(500).json({error: 'Internal server error'});
    }) 

});
// Getting howls posted by all users followed by the "authenticated" user
apiRouter.get('/followers/howls', TokenMiddleware, (req,res) => {
   
        //const following = req.params.following;
        const following = req.user.id;
        HowlDAO.getHowlByFollowing(following).then(howls => {
            if(howls){
                res.json(howls);
            } else {
                res.status(404).json({error: 'No Howls found'});
            }
            
        })  
        .catch(err => {
            res.status(500).json({error: 'Internal server error'});
        })  
      
   
});


  

//USER ENDPOINTS

apiRouter.post('/users/login', (req,  res) => {
    if(req.body.username && req.body.password) {
      UserDAO.getUserByCredentials(req.body.username, req.body.password).then(user => {
        let result = {
          user: user
        }
  
        generateToken(req, res, user);
  
        res.json(result);
      }).catch(err => {
        console.log(err);
        res.status(err.code).json({error: err.message});
      });
    }
    else {
      res.status(401).json({error: 'Not authenticated'});
    }
  });
  
  apiRouter.post('/users/logout', (req,  res) => {
    removeToken(req, res);
  
    res.json({success: true});
  });

apiRouter.get('/users/current', TokenMiddleware, (req, res) => {
      res.json(req.user);
  });
//   apiRouter.get('/users/current/profiles', TokenMiddleware, (req,  res) => {

//       res.json(req.session.visitedUsers);
        
//   });

apiRouter.get('/users/:userId', TokenMiddleware, (req, res) => {

        const userId = req.params.userId;
        UserDAO.getUserById(userId).then(user => {
            // if(!req.session.visitedUsers.includes(userId)){
            //     req.session.visitedUsers.push(userId);
            // } 
            res.json(user);
        })
        .catch(err => {
            res.status(404).json({error: 'User not found'});
        })  
    
});

apiRouter.get('/following/:userId', TokenMiddleware, (req,res) => {
   
        const userId = req.params.userId;
       FollowerDAO.getUsersFollowing(userId).then(following => {
        console.log(following);
        if(following){
            res.json(following);
        } else{
            res.status(404).json({error: 'No Following found'});
        }
       })  
        .catch(err => {
            res.status(500).json({error: 'Internal server error'});
        })  
      
      
});
apiRouter.put('/following/:userA/follows/:userB', TokenMiddleware, (req,  res) => {
    const userB = req.params.userB;
    const userA = req.params.userA;
    FollowerDAO.FollowUser(userA, userB).then(() => {
        res.status(200).json({ message: 'Follow succsesful' });
    })
    .catch(err => {
        res.status(500).json({error: 'Internal server error'});
    }) 
});
apiRouter.delete('/following/:userA/follows/:userB', TokenMiddleware, (req,  res) => {
    const userB = req.params.userB;
    const userA = req.params.userA;
    FollowerDAO.UnfollowUser(userA, userB).then(() => {
        res.status(200).json({ message: 'Unfollow succsesful' });
    })
    .catch(err => {
        res.status(500).json({error: 'Internal server error'});
    }) 
});
module.exports = apiRouter;
