const Event = require("../../model/Event");
const Action = require("../../model/Action");

const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.EventID;
        const event = await Event.findByIdAndDelete(eventId);
        for (let i of event.Actions) {
            await Action.findByIdAndDelete(i);
        }
        res.json({Status: "Successfully Deleted Event and all Corresponding Actions"});
    } catch (err) {
        res.json(err);
    }
};

module.exports = deleteEvent;