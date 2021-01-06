const Action = require('../../model/Action')

const next = async (req, res) => {
  try {
    const ActionID = req.params.ActionID
    const QuestionID = req.params.QuestionID
    const action = await Action.findById(ActionID)
    const length = action.Questions.length
    let p = 0; let flag = 0
    for (let i = 0; i < length; i++) {
      if (action.Questions[i]._id == QuestionID) {
        p = i
        flag = 1
        break
      }
    }
    if (flag === 0) {
      return res.status(404).json({ Error: 'Question not found' })
    }
    action.Questions[p].isOpen = false
    action.Questions[p + 1].isOpen = true
    await action.save()
    res.json(action.Questions[p + 1])
  } catch (err) {
    res.json(err)
  }
}

module.exports = next
