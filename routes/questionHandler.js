const router = require('express').Router()
const verify = require('./verifyToken')

const addQuestion = require('./questions/addQuestion')
const nextQuestion = require('./questions/nextQuestion')
const publishQuestion = require('./questions/publishQuestion')
const closeQuestion = require('./questions/closeQuestion')
const firstQuestion = require('./questions/firstQuestion')
const publishFirstQuestion = require('./questions/publishFirstQuestion')
const next = require('./questions/next')
const addAllQuestion = require('./questions/addQuestionsAll')

router.post('/addQuestion/:ActionID', verify, addQuestion)
router.get('/nextQuestion/:ActionID/:QuestionID', nextQuestion)
router.get('/nextQuestion/:ActionID', firstQuestion)
router.get('/publishQuestion/:ActionID/:QuestionID', verify, publishQuestion)
router.get('/publishQuestion/:ActionID', verify, publishFirstQuestion)
router.get('/closeQuestion/:ActionID/:QuestionID', verify, closeQuestion)
router.get('/next/:ActionID/:QuestionID', verify, next)
router.post('/addQuestionsAll/:ActionID', verify, addAllQuestion)

module.exports = router
