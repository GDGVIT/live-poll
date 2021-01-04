const Action = require('../../model/Action')

const addQuestion = async (req, res) => {
  const actionID = req.params.ActionID
  Action.findByIdAndUpdate(
    actionID,
    { $push: { Questions: req.body } },
    err => {
      if (err) {
        return res.json(err)
      }
    }
  )
  await Action.findById(actionID)
    .then(data => {
      const length = data.Questions.length
      res.json(data.Questions[length - 1])
    })
    .catch(err => {
      res.json(err)
    })
}
module.exports = addQuestion
