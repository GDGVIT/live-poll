const Event = require('../../model/Event')
const Action = require('../../model/Action')
const { actionTypeValidation } = require('../../validation')

const addAction = (req, res) => {
  const eventID = req.params.EventID
  const type = req.body.action_type
  const title = req.body.title
  const { error } = actionTypeValidation(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const action = new Action({
    action_type: type,
    title: title
  })
  action
    .save()
    .then(async data => {
      await Event.findByIdAndUpdate(eventID, { $push: { Actions: data._id } })
      await res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
}
module.exports = addAction
