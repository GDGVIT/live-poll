//jshint esversion:6
const Event = require("../../model/Event");

const getEventdetail = (req, res) => {
    const eventID = req.params.EventID;
    Event.findById(eventID)
        .then(event => {
            res.json(event);
        })
        .catch(err => {
            res.json(err);
        });
};

module.exports = getEventdetail;
