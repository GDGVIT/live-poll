//jshint esversion:6
const router = require("express").Router();
const verify = require("./verifyToken");

const addOption = require("./options/addOption");
const updateStat = require("./options/updateStat");

router.post("/addOption/:ActionID/:QuestionID", addOption);
router.post("/updateStat/:ActionID/:QuestionID/:OptionID", verify, updateStat);

module.exports = router;