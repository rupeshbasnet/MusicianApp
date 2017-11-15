const express = require('express');
const router = express.Router();


router.use('/profile', require('./profile'));
router.use('/users', require('./users'));

router.get('/', (req, res) => {
  res.render('homepage');
});



module.exports = router;
