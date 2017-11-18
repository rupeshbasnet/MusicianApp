const router = require('express').Router();
const passport = require('../middlewares/authentication');


router.post('/', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
