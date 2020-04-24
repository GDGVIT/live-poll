//jshint esversion:8
const router = require("express").Router();
const verify = require("./verifyToken");

const addAction = require("./actions/addAction");
const getActiondetail = require("./actions/getActiondetail");
const openAction = require("./actions/openAction");
const closeAction = require("./actions/closeAction");
const getBasicAction = require("./actions/getBasicAction");
const deleteAction = require("./actions/deleteAction");

router.post("/addAction/:EventID", verify, addAction);
router.get("/getActiondetail/:ActionID", getActiondetail);
router.get("/openAction/:ActionID", openAction);
router.get("/closeAction/:ActionID", closeAction);
router.get("/getBasicAction/:ActionID", getBasicAction);
router.delete("/deleteAction/:ActionID",verify,deleteAction);

module.exports = router;
