const router = require('express').Router()
const verify = require('./verifyToken')

const addAction = require('./actions/addAction')
const getActionDetail = require('./actions/getActiondetail')
const openAction = require('./actions/openAction')
const closeAction = require('./actions/closeAction')
const getBasicAction = require('./actions/getBasicAction')
const deleteAction = require('./actions/deleteAction')

router.post('/addAction/:EventID', verify, addAction)
router.get('/getActiondetail/:ActionID', getActionDetail)
router.get('/openAction/:ActionID', openAction)
router.get('/closeAction/:ActionID', closeAction)
router.get('/getBasicAction/:ActionID', getBasicAction)
router.delete('/deleteAction/:EventID/:ActionID', verify, deleteAction)

module.exports = router
