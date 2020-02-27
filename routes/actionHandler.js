//jshint esversion:8
const router = require("express").Router();
const verify = require("./verifyToken");

const addAction = require("./actions/addAction");
const getActiondetail = require("./actions/getActiondetail");

router.post("/addAction/:EventID", verify, addAction);
router.get("/getActiondetail/:ActionID", verify, getActiondetail);

module.exports = router;
