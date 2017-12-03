const express = require('express');
const router = express.Router();

const models = require('../models');


router.use('/login', require('./login'));
router.use('/signup', require('./signup'));
router.use('/profile', require('./profile'));
router.use('/logout', require('./logout'));
router.use('/beats', require('./beats'));
router.use('/users', require('./users'));
router.use('/colab', require('./colab'));

router.get('/', (req, res) => {
  // res.render('homepage');
  var beats = [];
  if(req.user) {
    req.user.getBeats()
    .then(myBeats => {
      myBeats.forEach((beat) => {
        beats.push(beat.dataValues);
      });
    })
    .then(() => {
      res.render('homepage', {cur_user: req.user, beats: beats});
    });

  }
  else {
    res.render('homepage', {cur_user: req.user});
  }
});



module.exports = router;
