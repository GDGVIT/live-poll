//jshint esversion:8
const router = require("express").Router();
const verify = require("./verifyToken");

const addEvent = require("./events/addEvent");
const getEventdetail = require("./events/getEventdetail");
const getEvent = require("./events/getEvent");
const updateParticipants = require("./events/updateParticipants");
const deleteEvent = require("./events/deleteEvent");
const editEventTitle = require("./events/editEventTitle");

router.post("/addEvent", verify, addEvent);
router.get("/getEventdetail/:EventID", getEventdetail);
router.get("/getEvent/:Code", getEvent);
router.get("/updateParticipant/:Code", updateParticipants);
router.delete("/deleteEvent/:EventID",verify,deleteEvent);
router.patch("/editEventTitle/:EventID",verify,editEventTitle);

module.exports = router;