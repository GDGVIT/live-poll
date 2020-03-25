//jshint esversion:8
const Action = require("../../model/Action");

const nextQuestion = (req, res) => {
  const actionID = req.params.ActionID;
  Action.findById(actionID)
    .then(data => {
      const length = data.Questions.length;
      let p = 0;
      for (let i = 0; i < length; i++) {
        if (data.Questions[i]._id === req.params.QuestionID) {
          p = i;
          break;
        }
      }
      res.json(data.Questions[p + 1]);
    })
    .catch(err => {
      res.json(err);
    });
};

module.exports = nextQuestion;
