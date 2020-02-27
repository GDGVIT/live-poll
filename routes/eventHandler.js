//jshint esversion:8
const router = require("express").Router();
const verify = require("./verifyToken");

const addEvent = require("./events/addEvent");
const getEventdetail = require("./events/getEventdetail");

router.post("/addEvent", verify, addEvent);
router.get("/getEventdetail/:EventID", verify, getEventdetail);

module.exports = router;
