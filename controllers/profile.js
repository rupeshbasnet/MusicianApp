const router = require('express').Router();
const Redirect = require('../middlewares/redirect');

router.get('/', Redirect.ifNotLoggedIn(), (req, res) => {
  res.render('profile', { randomPerson: req.user })
});

module.exports = router;