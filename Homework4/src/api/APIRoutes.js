const express = require('express');
const apiRouter = express.Router();

const UserDAO = require('./db/UserDAO');
const FollowerDAO = require('./db/FollowerDAO');
const HowlDAO = require('./db/HowlDAO');

apiRouter.use(express.json());


//Getting howls posted by a specific user
apiRouter.get('/howls/:userId', (req,res) => {
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
})

// Getting howls posted by all users followed by the "authenticated" user
apiRouter.get('/followers/howls', (req,res) => {
    if(req.session.user) {
        //const following = req.params.following;
        const following = req.session.user.id;
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
      }
      else {
        res.status(401).json({error: 'Not authenticated'});
      }
   
})

//USER ENDPOINTS
apiRouter.get('/users/current', (req,  res) => {
    if(req.session.user) {
      res.json(req.session.user);
    }
    else {
      res.status(401).json({error: 'Not authenticated'});
    }
  });
//   apiRouter.get('/users/current/howls', (req,  res) => {
//     if(req.session.user) {
//       res.json(req.session.HowlsPosted);
//     }
//     else {
//       res.status(401).json({error: 'Not authenticated'});
//     }
//   });
module.exports = apiRouter;
