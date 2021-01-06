const Action = require('../../model/Action')

const firstQuestion = async (req, res) => {
  try {
    const ActionID = req.params.ActionID
    const action = await Action.findById(ActionID)
    res.send(action.Questions[0])
  } catch (err) {
    res.json(err)
  }
}

module.exports = firstQuestion
