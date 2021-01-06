const Action = require('../../model/Action')

const openAction = async (req, res) => {
  const ActionID = req.params.ActionID
  Action.findByIdAndUpdate(ActionID, { $set: { isOpen: true } }, err => {
    if (err) {
      res.json(err)
    } else {
      res.json({ Status: 'Successfully Opened Action' })
    }
  })
}

module.exports = openAction
