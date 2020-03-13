//jshint esversion:6
const Action = require("../../model/Action");

const closeQuestion = (req, res) => {
    const actionID = req.params.ActionID;
    const questionID = req.params.QuestionID;
    Action.updateOne({ _id: actionID, "Questions._id": questionID }, { $set: { "Questions.$.isOpen": false } },
        err => {
            if (err) {
                res.json(err);
            } else {
                res.json({ Status: "Question Published" });
            }
        }
    );
};

module.exports = closeQuestion;