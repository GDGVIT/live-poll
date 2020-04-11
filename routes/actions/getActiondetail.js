//jshint esversion:6
const Action = require("../../model/Action");

const getActiondetail = (req, res) => {
    const actionID = req.params.ActionID;
    Action.findById(actionID)
        .then(action => {
            res.json(action);
        })
        .catch(err => {
            res.json(err);
        });
};

module.exports = getActiondetail;
