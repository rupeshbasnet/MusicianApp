const express = require('express');
const models = require('../models');

const router = express.Router();

// This route retrieves a list of all patterns
router.get('/', (req, res) => {
  models.Patterns.findAll()
    .then((allPatterns) => {
      res.json(allPatterns);
    })
});

// This route retrieves a specific beat
router.get('/:id', (req, res) => {
  models.Patterns.findOne({
    where: {
      id: req.params.id
    }
  })
  .then((pattern) => {
    res.json(pattern);
  })
});

router.post('/', (req, res) => {
  models.Patterns.create({
    title: req.body.title,
    description: req.body.description,
    beatArray: req.body.beatArray,
    UserId: req.user.id
  })
  .then((pattern) => {
    res.json(pattern);
  })
});

router.put('/:id', (req, res) => {
  models.Patterns.update({
    title: req.body.title,
    description: req.body.description,
    beatArray: req.body.beatArray
  }, {
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.sendStatus(200);
  });
});

router.delete('/:id', (req, res) => {
  models.Patterns.destroy({
    where: {
      id: req.params.id
    }
  })
  .catch(() => {
    console.log('error here')
    res.sendStatus(400);
  });
});

module.exports = router;
