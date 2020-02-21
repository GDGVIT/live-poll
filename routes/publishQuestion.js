//jshint esversion:6
const router = require("express").Router();
const Action = require("../model/Action");
const verify = require("./verifyToken");
router.get("/:ActionID/:QuestionID", verify, (req, res) => {
  const ActionID = req.params.ActionID;
  const QuestionID = req.params.QuestionID;
  Action.updateOne(
    { _id: ActionID, "Questions._id": QuestionID },
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
