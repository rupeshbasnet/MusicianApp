const express = require('express');
const models = require('../models');

const router = express.Router();


//create new user, for testing
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


router.get('/:id', (req, res) => {
  models.Users.findById(parseInt(req.params.id), {
    include: [{
      model: models.Beats
    }]
  })
  .then(users => {
    res.json(users);
  });
});

router.post('/:id/beats', (req, res) => {
  models.Users.findById(parseInt(req.params.id))
    .then(users => {
      models.Beats.create({
        title: req.body.title,
        description: req.body.description,
        beatArray: req.body.beatArray,
        UserID: users.id
      })
      .then((beats) => {
        res.json(beats);
      })
    })
    .catch(() => {
      console.log('error here')
      res.sendStatus(400);
    });
});


router.put('/:id', (req, res) => {
  res.json({
    msg: "Successful PUT to '/' route",
    id: req.params.id
  });
});

router.delete('/:id', (req, res) => {
  res.json({
    msg: "Successful DELETE to '/' route",
    id: req.params.id
  });
});


module.exports = router;
