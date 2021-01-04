const Event = require('../../model/Event')
const Action = require('../../model/Action')
const User = require('../../model/User')

const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.EventID
    const event = await Event.findByIdAndDelete(eventId)
    const user = await User.findById(req.user._id)
    for (let a = 0; a < user.events.length; a++) {
      if (user.events[a] === eventId) {
        user.events.splice(a, 1)
      }
    }
    await user.save()
    for (const i of event.Actions) {
      await Action.findByIdAndDelete(i)
    }
    res.json({ Status: 'Successfully Deleted Event and all Corresponding Actions' })
  } catch (err) {
    res.json(err)
  }
}

module.exports = deleteEvent
