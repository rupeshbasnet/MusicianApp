const router = require('express').Router();
const models = require('../models');
const bcrypt = require('bcryptjs');


router.get('/', (req, res) => {
  res.render('login');
});

// router.post('/', (req, res) => {
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//   })(req, res);
// });

// Authenitcate User
router.post('/', (req, res) => {
  models.Users.findOne( {where: {username: req.body.username}} )
  .then( (foundUser) => {
    if(foundUser){
      if(foundUser.authenticate(req.body.password, foundUser.password_hash)){
        console.log("isMatch !!!!!!!");
        res.json(foundUser);
      }


      else
        console.log("no match !!!!!!!!!!!");
    }
    else {
      console.log("User Not Found");
    }
  })
});

module.exports = router;
