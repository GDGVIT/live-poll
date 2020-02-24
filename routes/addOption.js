//jshint esversion:6
const router = require("express").Router();
const Action = require("../model/Action");
const verify = require("./verifyToken");

router.post("/:ActionID/:QuestionID", verify, (req, res) => {
  const actionID = req.params.ActionID;
  const questionID = req.params.QuestionID;
  Action.updateOne(
    { _id: actionID, "Questions._id": questionID },
    { $push: { "Questions.$.options": req.body } },
    err => {
      if (err) {
        res.json(err);
      } else {
        res.json({"Status":"Successfully added Option"});
      }
    }
  );
});

module.exports = router;
