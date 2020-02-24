//jshint esversion:6
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const socket = require("socket.io");
//Middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
dotenv.config();
app.use(cors());

//Connect to Database
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  () => console.log("connected to DB")
);
//Setting up server
const server = app.listen(process.env.PORT, () =>
  console.log("Server is up and running")
);
//Setting up socket server
const io = socket(server);
app.set("socketio", io);
//Calling all routes
const authRoute = require("./routes/auth");
const addEvent = require("./routes/addEvent");
const addAction = require("./routes/addAction");
const addQuestion = require("./routes/addQuestion");
const addOption = require("./routes/addOption");
const nextQuestion = require("./routes/nextQuestion");
const updateStat = require("./routes/updateStat");
const publishQuestion = require("./routes/publishQuestion");
const chooseOption = require("./routes/chooseOption");
const getEventdetail = require("./routes/getEventdetail");
const getActiondetail = require("./routes/getActiondetail");
app.use("/api/user", authRoute);
app.use("/api/event/addEvent", addEvent);
app.use("/api/event/action/addAction", addAction);
app.use("/api/event/action/question/addQuestion", addQuestion);
app.use("/api/event/action/question/option/addOption", addOption);
app.use("/api/event/action/question/nextQuestion", nextQuestion);
app.use("/api/event/action/question/option/updateStat", updateStat);
app.use("/api/event/action/question/publishQuestion", publishQuestion);
app.use("/api/event/action/question/option/chooseOption", chooseOption);
app.use("/api/event/getEventdetail", getEventdetail);
app.use("/api/event/action/getActiondetail", getActiondetail);