const router = require('express').Router();
const passport = require('../middlewares/authentication');
const Redirect = require('../middlewares/redirect');


router.get('/', (req, res) => {
  res.render('login', {
    status: req.flash('error')
  });
});

router.post('/', (req, res) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res);
});

module.exports = router;
