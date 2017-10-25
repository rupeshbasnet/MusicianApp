const express = require('express');
const router = express.Router();


router.use('/alt', require('./alt'));
router.use('/', require('./home'));


router.get('/', (req, res) => {
  res.render('homepage');
});



module.exports = router;
