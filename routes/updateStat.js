// jshint esversion:6
const router = require("express").Router();
const Action = require("../model/Action");

router.get("/:ActionID/:QuestionID/:OptionID", (req, res) => {
  const ActionID = req.params.ActionID;
  const QuestionID = req.params.QuestionID;
  const OptionID = req.params.OptionID;
  Action.findOne({ _id: ActionID })
    .then(data => {
      let flag = false;
      for (let ac of data.Questions) {
        if (ac._id == QuestionID) {
          for (let opt of ac.options) {
            if (opt._id == OptionID) {
              flag = true;
              opt.stat = req.body.stat;
            }
          }
        }
      }
      if (!flag) {
        return res
          .status(404)
          .json({ message: "Question or option not found" });
      }
      data
        .save()
        .then(data => {
          res.json(data);
        })
        .catch(err => {
          res.json(err);
        });
    })
    .catch(err => {
      res.json(err);
    });
});
module.exports = router;
