const express = require('express');
const router = express.Router();


router.use('/users', require('./users'));
router.use('/', require('./home'));

router.get('/', (req, res) => {
  res.render('homepage');
});


module.exports = router;
