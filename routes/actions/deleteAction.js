const Action = require("../../model/Action");

const deleteAction = async (req, res) => {
    try {
        const actionId = req.params.ActionID;
        await Action.findByIdAndDelete(actionId);
        res.json({Status: "Deleted Action Successfully"});
    } catch (err) {
        res.json(err);
    }
}

module.exports = deleteAction;