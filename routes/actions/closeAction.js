const Action = require("../../model/Action");

const closeAction = async (req, res) => {
    const ActionID = req.params.ActionID;
    try {
        const action = await Action.findById(ActionID);
        action.isOpen = false;
        for (let question of action.Questions) {
            if (question.isOpen == true) {
                question.isOpen = false;
            }
        }
        res.json({"Status": "Successfully Closed Action"});
    } catch (err) {
        res.json(err);
    }
};

module.exports = closeAction;