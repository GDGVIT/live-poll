const Action = require("../../model/Action");

const publishFirstQuestion = async(req,res) =>{
    try{
        const ActionID = req.params.ActionID;
        const action = await Action.findById(ActionID);
        action.Questions[0].isOpen = true;
        await action.save();
        res.json({"Status":"First Question Opened"});
    } catch(err){
        res.json(err);
    }
};

module.exports = publishFirstQuestion;