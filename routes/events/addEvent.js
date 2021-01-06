const Event = require('../../model/Event')
const random = require('random-number')
const User = require('../../model/User')
const jwt = require('jsonwebtoken')

const addEvent = async (req, res) => {
  try {
    const token = req.header('auth-token')
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    const options = {
      min: 100000,
      max: 999999,
      integer: true
    }
    const event = new Event({
      Name: req.body.Name,
      Code: random(options)
    })
    const data = await event.save()
    await User.findByIdAndUpdate(decoded._id, { $push: { events: event._id } })
    res.json(data)
  } catch (err) {
    res.json(err)
  }
}

module.exports = addEvent
