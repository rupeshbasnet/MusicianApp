const router = require('express').Router();
const models = require('../models');
const User = models.User;

router.get('/', (req, res) => {
  res.render('signup')
});

// router.post('/', (req, res) => {
//   User.create({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     username: req.body.username,
//     email: req.body.email,
//     password: req.body.password,
//   }).then((user) => {
//     req.login(user, () =>
//       res.redirect('/profile')
//     );
//   }).catch(() => {
//     res.render('signup');
//   });
// });

// Create a new user
router.post('/', (req, res) => {
  models.Users.create({
    username: req.body.username,
    password: req.body.password
  })
  .then((users) => {
    res.json(users);
  })
  .catch(() => {
    res.sendStatus(400);
  })
});

module.exports = router;
