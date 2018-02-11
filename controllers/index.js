const express = require('express');
const router = express.Router();

const models = require('../models');


router.use('/login', require('./login'));
router.use('/signup', require('./signup'));
router.use('/profile', require('./profile'));
router.use('/logout', require('./logout'));
router.use('/beats', require('./beats'));
router.use('/synth_patterns', require('./synth_patterns'));
router.use('/users', require('./users'));
router.use('/colab', require('./colab'));

router.get('/', (req, res) => {
  // res.render('homepage');
  var beats = [];
  var synth_patterns = [];

  if(req.user) {

    req.user.getBeats()
    .then(myBeats => {
      myBeats
      .sort((a, b) => { return a.dataValues.id - b.dataValues.id })
      .forEach((beat) => {
        beats.push(beat.dataValues);
      });
    })
    .then(() => {
      req.user.getPatterns()
      .then(myPatterns => {

        myPatterns
        .sort((a, b) => { return a.dataValues.id - b.dataValues.id })
        .forEach((ptrn) => {
          synth_patterns.push(ptrn.dataValues);
        });
      })
      .then(() => {
        res.render('homepage', {cur_user: req.user, beats: beats, synth_patterns: synth_patterns});
      })
    });

  }
  else {
    res.render('homepage', {cur_user: req.user});
  }
});



module.exports = router;
