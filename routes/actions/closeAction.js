const Action = require("../../model/Action");

const closeAction = async (req, res) => {
    const ActionID = req.params.ActionID;
    Action.findByIdAndUpdate(ActionID, {$set: {isOpen: false}}, err => {
        if (err) {
            res.json(err);
        } else {
            res.json({"Status": "Successfully Closed Action"});
        }
    });
};

module.exports = closeAction;