const express = require('express');
const models = require('../models');

const router = express.Router();

// This route retrieves a list of all beats
router.get('/', (req, res) => {
  models.Beats.findAll()
    .then((allBeats) => {
      res.json(allBeats);
    })
});

// This route retrieves a specific beat
router.get('/:id', (req, res) => {
  models.Beats.findOne({
    where: {
      id: req.params.id
    }
  })
  .then((beat) => {
    res.json(beat);
  })
});

router.post('/', (req, res) => {
  models.Beats.create({
    title: req.body.title,
    description: req.body.description,
    beatArray: req.body.beatArray,
    UserId: req.user.id
  })
  .then((beats) => {
    res.json(beats);
  })
});

router.put('/:id', (req, res) => {
  models.Beats.update({
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
  models.Beats.destroy({
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
