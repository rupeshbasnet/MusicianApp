const express = require('express');
const router = express.Router();

router.use('/login', require('./login'));
router.use('/signup', require('./signup'));
router.use('/profile', require('./profile'));
router.use('/users', require('./users'));
router.use('/', require('./home'));

router.get('/', (req, res) => {
  res.render('homepage');
});

// router.get('/login', (req, res) => {
//   res.render('login');
// });



module.exports = router;
