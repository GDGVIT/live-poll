//jshint esversion:6
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
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
    useUnifiedTopology: true
  },
  () => console.log("connected to DB")
);
const authRoute = require("./routes/auth");
app.use("/api/user", authRoute);
app.listen(process.env.PORT, () => console.log("Server is up and running"));
