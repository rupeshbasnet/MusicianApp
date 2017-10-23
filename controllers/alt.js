const express = require('express');
const models = require('../models');

const AltController = {
  registerRouter() {
    const router = express.Router();

    router.get('/', this.index);
    router.post('/', this.create);
    router.put('/:id', this.update);
    router.delete('/:id', this.delete);

    return router;
  },
  index(req, res) {
    res.json({
      msg: "Successful GET to '/alt' route"
    });
  },
  create(req, res) {
    res.json({
      msg: "Successful POST to '/alt' route"
    });
  },
  update(req, res) {
    res.json({
      msg: "Successful PUT to '/alt' route",
      id: req.params.id
    });
  },
  delete(req, res) {
    res.json({
      msg: "Successful DELETE to '/alt' route",
      id: req.params.id
    });
  },
};


module.exports = AltController.registerRouter();
