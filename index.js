//jshint esversion:6
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
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
const authRoute = require("./routes/auth");
const addEvent = require("./routes/addEvent");
const addAction = require("./routes/addAction");
const addQuestion = require("./routes/addQuestion");
const addOption = require("./routes/addOption");
const nextQuestion = require("./routes/nextQuestion");
app.use("/api/user", authRoute);
app.use("/api/addEvent", addEvent);
app.use("/api/addAction", addAction);
app.use("/api/addQuestion", addQuestion);
app.use("/api/addOption",addOption);
app.use("/api/nextQuestion",nextQuestion);
app.listen(process.env.PORT, () => console.log("Server is up and running"));
