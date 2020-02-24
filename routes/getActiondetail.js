//jshint esversion:6
const router = require("express").Router();
const Action = require("../model/Action");

router.get("/:ActionID", (req, res) => {
  const actionID = req.params.ActionID;
  Action.findById(actionID)
    .then(action => {
      res.json(action);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
