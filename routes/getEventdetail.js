//jshint esversion:6
const router = require("express").Router();
const Event = require("../model/Event");

router.get("/:EventID", (req, res) => {
  const eventID = req.params.EventID;
  Event.findById(EventID)
    .then(event => {
      res.json(event);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
