const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('profile', { randomPerson: req.user })
});

module.exports = router;