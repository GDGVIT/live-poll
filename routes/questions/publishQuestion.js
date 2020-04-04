//jshint esversion:6
const Action = require("../../model/Action");

const publishQuestion = (req, res) => {
    const actionID = req.params.ActionID;
    const questionID = req.params.QuestionID;
    Action.updateOne(
        {_id: actionID, "Questions._id": questionID},
        {$set: {"Questions.$.isOpen": true}},
        err => {
            if (err) {
                res.json(err);
            } else {
                res.json({Status: "Question Published"});
            }
        }
    );
};

module.exports = publishQuestion;
