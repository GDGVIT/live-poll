const Event = require("../../model/Event");

const updateParticipants = async (req, res) => {
    try {
        const code = req.params.code;
        const event = await Event.findOne({Code: code});
        event.Participants += 1;
        await event.save();
        res.json({"Status": "Added participant"});
    } catch (err) {
        res.json(err);
    }
};

module.exports = updateParticipants;