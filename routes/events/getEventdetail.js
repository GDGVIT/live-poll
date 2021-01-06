const Event = require('../../model/Event')

const getEventDetail = (req, res) => {
  const eventID = req.params.EventID
  Event.findById(eventID)
    .then(event => {
      res.json(event)
    })
    .catch(err => {
      res.json(err)
    })
}

module.exports = getEventDetail
