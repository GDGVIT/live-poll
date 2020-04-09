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

let oldData = [];
// Array Functions
const increment = (option_id) => {
    let flag = 0;
    oldData.forEach((data) => {
        if (data._id == option_id) {
            data.stat += 1;
            flag = 1;
            return data;
        }
    })
    if (flag == 0) {
        oldData.push({
            stat: 0,
            _id: option_id
        });
        return {
            stat: 0,
            _id: option_id
        };
    }
}

const clean = (option_ids) => {
    for (let _id of option_ids) {
        for (let i = 0; i < oldData.length; i++) {
            if (_id == oldData[i]._id) {
                oldData.splice(i, 1);
            }
        }
    }
}

const restore = (option_ids) =>{
    for (let _id of option_ids) {
        for (let i of oldData) {
            if (_id == i._id) {
                i.stat = 0;
            }
        }
    }
}

io.on("connection", sc => {
    sc.emit("New Connection", oldData);
    console.log("Connected");
    sc.on("disconnect", () => {
        console.log("Disconnected");
    });
    sc.on("option", option_id => {
        mutex.lock(() => {
            let dataToEmit = increment(option_id);
            io.sockets.emit("all options", dataToEmit);
            mutex.unlock();
        });
    });
    sc.on("next question", data => {
        io.sockets.emit("next", data);
    })
    sc.on("close quiz", data => {
        clean(data);
        io.sockets.emit("quiz ended", data);
    })
    sc.on("reset options", data =>{
        restore(data);
    })
});

app.use("/api/user", authRoute);
app.use("/api/events", eventHandler);
app.use("/api/actions", actionHandler);
app.use("/api/questions", questionHandler);
app.use("/api/options", optionHandler);