// jshint esversion:8
const router = require("express").Router();
const Action = require("../model/Action");

router.get("/:ActionID/:QuestionID/:OptionID", (req, res) => {
  const ActionID = req.params.ActionID;
  const QuestionID = req.params.QuestionID;
  const OptionID = req.params.OptionID;
  Action.findOneAndUpdate(
    { 
      _id:ActionID,
      options: {
        $elemMatch: {
          _id: OptionID,
        }
      }
    },
    { $inc: { "options.$.stat": 1 } }
  )
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});
module.exports = router;
