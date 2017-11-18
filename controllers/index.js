const express = require('express');
const router = express.Router();


router.use('/login', require('./login'));
router.use('/signup', require('./signup'));
router.use('/profile', require('./profile'));
router.use('/logout', require('./logout'));


router.get('/', (req, res) => {
  // res.render('homepage');
  res.render('homepage', {cur_user: req.user});

});



module.exports = router;
