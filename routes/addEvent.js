//jshint esversion:8
const router = require("express").Router();
const Event = require("../model/Event");
const uuid4 = require("uuid4");
const verify = require("./verifyToken");
router.post("/", verify, (req, res) => {
  const event = new Event({
    Name: req.body.Name,
    Code: uuid4()
  });
  event
    .save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({
        message: err
      });
    });
});

module.exports = router;
