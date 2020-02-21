//jshint esversion:8
const router = require("express").Router();
const Event = require("../model/Event");
const random = require("random-number");
const verify = require("./verifyToken");
router.post("/", verify, (req, res) => {
  const options={
    min:100000,
    max:999999,
    integer:true
  };
  const event = new Event({
    Name: req.body.Name,
    Code: random(options)
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
