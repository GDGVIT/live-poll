//jshint esversion:8
const router = require("express").Router();
const Event = require("../model/Event");
const Action = require("../model/Action");
const verify = require("./verifyToken");

router.post("/:event_id", verify, (req, res) => {
  const eventID = req.params.event_id;
  const type=req.body.action_type;
  if(type !== "Quiz" || type !== "Poll" || type !== "Feedback"){
      res.status(400).json({"Error":"Invalid Action Type"});
  }
  const action = new Action({
    action_type: req.body.action_type
  });
  action
    .save()
    .then(async data => {
      await Event.findByIdAndUpdate(eventID, { $push: { Actions: data._id } });
      await res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});
module.exports = router;
