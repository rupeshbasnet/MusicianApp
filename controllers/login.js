const router = require('express').Router();
const passport = require('../middlewares/authentication');
const Redirect = require('../middlewares/redirect');


router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', (req, res) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  })(req, res);
  res.render('login', {cur_user: true});
});

module.exports = router;
