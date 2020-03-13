//jshint esversion:8
const router = require("express").Router();
const verify = require("./verifyToken");

const addQuestion = require("./questions/addQuestion");
const nextQuestion = require("./questions/nextQuestion");
const publishQuestion = require("./questions/publishQuestion");
const closeQuestion = require("./questions/closeQuestion");

router.post("/addQuestion/:ActionID", verify, addQuestion);
router.get("/nextQuestion/:ActionID/:QuestionID", nextQuestion);
router.get("/publishQuestion/:ActionID/:QuestionID", verify, publishQuestion);
router.get("/closeQuestion/:ActionID/:QuestionID", verify, closeQuestion);

module.exports = router;