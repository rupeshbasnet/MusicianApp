const express = require('express');
const router = express.Router();

router.get('/', Redirect.ifNotLoggedIn(), (req, res) => {
  res.render('profile', { randomPerson: req.user })
});

module.exports = router;
