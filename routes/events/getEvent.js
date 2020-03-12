//jshint esversion:6
const Event = require("../../model/Event");

const getEvent = (req, res) => {
  const code = req.params.Code;
  Event.findOne({ Code: code })
    .then(event => {
      res.json(event);
    })
    .catch(err => {
      res.json(err);
    });
};

module.exports = getEvent;
