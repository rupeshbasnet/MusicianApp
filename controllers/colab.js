const express = require('express');
const models = require('../models');
const router = express.Router();

const Redirect = require('../middlewares/redirect');


router.get('/', Redirect.ifNotLoggedIn(), (req, res) => {
  res.render('colab', {cur_user: req.user, colab_page: "true"});
});

module.exports = router;
