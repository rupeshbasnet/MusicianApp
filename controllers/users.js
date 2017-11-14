const express = require('express');
const models = require('../models');

const router = express.Router();

// This route retrieves a list of all users
router.get('/', (req, res) => {
  models.Users.findAll()
    .then((allUsers) => {
      res.json(allUsers);
    })
});

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

// Get a specific user
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

module.exports = router;
