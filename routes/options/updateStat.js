const Action = require('../../model/Action')

const updateStat = (req, res) => {
  const actionID = req.params.ActionID
  const questionID = req.params.QuestionID
  const optionID = req.params.OptionID
  Action.findOne({ _id: actionID })
    .then(data => {
      let flag = false
      for (const ac of data.Questions) {
        if (ac._id == questionID) {
          for (const opt of ac.options) {
            if (opt._id == optionID) {
              flag = true
              opt.stat = req.body.stat
            }
          }
        }
      }
      if (!flag) {
        return res
          .status(404)
          .json({ message: 'Question or option not found' })
      }
      data
        .save()
        .then(data => {
          res.json(data)
        })
        .catch(err => {
          res.json(err)
        })
    })
    .catch(err => {
      res.json(err)
    })
}

module.exports = updateStat
