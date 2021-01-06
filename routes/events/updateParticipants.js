const Event = require('../../model/Event')

const updateParticipants = async (req, res) => {
  try {
    const code = req.params.Code
    const event = await Event.findOne({ Code: code })
    event.Participants += 1
    const savedEvent = await event.save()
    res.json(savedEvent)
  } catch (err) {
    res.json(err)
  }
}

module.exports = updateParticipants
