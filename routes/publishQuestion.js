//jshint esversion:6
const router = require("express").Router();
const Action = require("../model/Action");
const verify = require("./verifyToken");
router.get("/:ActionID/:QuestionID", verify, (req, res) => {
  const actionID = req.params.ActionID;
  const questionID = req.params.QuestionID;
  Action.updateOne(
    { _id: actionID, "Questions._id": questionID },
    { $set: { "Questions.$.isOpen": true } },
    err => {
      if (err) {
        res.json(err);
      } else {
        res.json({ Status: "Question Published" });
      }
    }
  );
});

module.exports = router;
