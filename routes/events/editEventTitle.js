const Event = require("../../model/Event");

const editEventTitle = async (req, res) => {
    try {
        const title = req.body.title;
        const eventId = req.params.EventID;
        await Event.findByIdAndUpdate(eventId, {$set: {Name: title}});
    } catch (err) {
        res.json(err);
    }
}

module.exports = editEventTitle;