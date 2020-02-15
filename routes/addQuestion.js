//jshint esversion:8
const router = require("express").Router();
const Action = require("../model/Action");
const verify = require("./verifyToken");

router.post("/:action_id", verify, async (req, res) => {
  const ActionID = req.params.action_id;
  Action.findByIdAndUpdate(
    ActionID,
    { $push: { Questions: req.body } },
    err => {
      if (err) {
        res.json(err);
      }
    }
  );
  await Action.findById(ActionID)
  .then(data=>{
    length=data.Questions.length;
    res.send(data.Questions[length-1]);
  })
  .catch(err=>{
    res.send(err);
  });
});
module.exports = router;
