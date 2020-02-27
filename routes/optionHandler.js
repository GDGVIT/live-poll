//jshint esversion:6
const router = require("express").Router();
const verify = require('./verifyToken');

const addOption = require("./options/addOption");
const updateStat = require("./options/updateStat");
const chooseOption = require("./options/chooseOption");

router.post("/addOption/:ActionID/:QuestionID", verify, addOption);
router.post("/updateStat/:ActionID/:QuestionID/:OptionID", verify, updateStat);
router.get("/chooseOption", chooseOption);

module.exports = router;
