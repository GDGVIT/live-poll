//jshint esversion:8
const Event = require("../../model/Event");
const random = require("random-number");
const User = require("../../model/User");
const jwt = require("jsonwebtoken");

const addEvent = async (req, res) => {
    const token = req.header('auth-token');
    const decoded = jwt.verify(token, process.env.TOKEN);
    const options = {
        min: 100000,
        max: 999999,
        integer: true
    };
    const event = new Event({
        Name: req.body.Name,
        Code: random(options)
    });
    const data = await event.save();
    User.findByIdAndUpdate(decoded._id, {$push: {events: event._id}}, err => {
        if (err) {
            return res.json(err)
        }
    });
    res.json(data);
};

module.exports = addEvent;
