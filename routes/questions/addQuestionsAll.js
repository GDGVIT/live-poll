const Action = require('../../model/Action')

const addQuestionAll = async (req, res) => {
  try {
    const ActionID = req.params.ActionID
    const action = await Action.findById(ActionID)
    for (const question of req.body) {
      action.Questions.push(question)
    }
    const newAction = await action.save()
    res.json(newAction)
  } catch (err) {
    res.json(err)
  }
}

module.exports = addQuestionAll
