//jshint esversion:8
const router = require("express").Router();
const verify = require("./verifyToken");

const addEvent = require("./events/addEvent");
const getEventdetail = require("./events/getEventdetail");
const getEvent = require("./events/getEvent");
const updateParticipants = require("./events/updateParticipants");

router.post("/addEvent", verify, addEvent);
router.get("/getEventdetail/:EventID", getEventdetail);
router.get("/getEvent/:Code", getEvent);
router.get("/updateParticipant/:Code", updateParticipants);

module.exports = router;