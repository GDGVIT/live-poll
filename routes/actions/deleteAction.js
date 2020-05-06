const Action = require("../../model/Action");
const Event = require("../../model/Event");

const deleteAction = async (req, res) => {
    try {
        const actionId = req.params.ActionID;
        const eventId = req.params.EventID;
        const event = await Event.findById(eventId);
        console.log(event);
        for(let a=0;a<event.Actions.length;a++){
            if(event.Actions[a]==eventId){
                event.Actions.splice(a,1);
            }
        }
        await event.save();
        await Action.findByIdAndDelete(actionId);
        res.json({Status: "Deleted Action Successfully"});
    } catch (err) {
        res.json(err);
    }
}

module.exports = deleteAction;