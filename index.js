//jshint esversion:6
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const socket = require("socket.io");
const mutex = require("locks").createMutex();
//Middleware
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
dotEnv.config();
app.use(cors());

//Connect to Database
mongoose.connect(
    process.env.DB_CONNECTION, {
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
const eventHandler = require("./routes/eventHandler");
const actionHandler = require("./routes/actionHandler");
const questionHandler = require("./routes/questionHandler");
const optionHandler = require("./routes/optionHandler");

io.on("connection", sc => {
    console.log("Connected");
    sc.on("disconnect", () => {
        console.log("Disconnected");
    });
    sc.on("option", data => {
        console.log(data);
        mutex.lock(() => {
            data.stat += 1;
            console.log(data);
            io.sockets.emit("all options", data);
            mutex.unlock();
        });
    });
});

app.use("/api/user", authRoute);
app.use("/api/events", eventHandler);
app.use("/api/actions", actionHandler);
app.use("/api/questions", questionHandler);
app.use("/api/options", optionHandler);