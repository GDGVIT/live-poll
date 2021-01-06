const Action = require('../../model/Action')

const getBasicAction = async (req, res) => {
  try {
    const actionID = req.params.ActionID
    const action = await Action.findById(actionID)
    const sendingData = {
      _id: action._id,
      title: action.title,
      action_type: action.action_type,
      isOpen: action.isOpen
    }
    res.json(sendingData)
  } catch (err) {
    res.json(err)
  }
}

module.exports = getBasicAction
