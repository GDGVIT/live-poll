//jshint esversion:6
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const socket = require("socket.io");
const mutex = require("locks").createMutex();
const redis = require("redis");
const {promisify} = require("util");
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
//Connecting to redis
const client = redis.createClient(process.env.REDIS_URL);
client.on('connect', () => {
    console.log('Redis Client Connected');
});
client.on('error', (err) => {
    console.log('Something went wrong ' + err);
});
//Creating callbacks to promises
const redisSet = promisify(client.set).bind(client);
const redisGet = promisify(client.get).bind(client);
const redisDel = promisify(client.del).bind(client);
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
const increment = async (option_id) => {
    try {
        let stat = await redisGet(option_id);
        console.log(stat);
        if (stat == null) {
            await redisSet(option_id, 1);
            return {
                stat: 1,
                _id: option_id
            }
        }
        stat += 1;
        console.log("Updated Stat" + stat);
        await redisSet(option_id, stat);
        return {
            stat: stat,
            _id: option_id
        }
    } catch (err) {
        console.log(err);
    }
}

const clean = async (option_ids) => {
    try {
        for (let _id of option_ids) {
            await redisDel(_id);
        }
    } catch (err) {
        console.log(err);
    }
}

const restore = async (option_ids) => {
    try {
        for (let _id of option_ids) {
            await redisSet(_id, 0);
        }
    } catch (err) {
        console.log(err);
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
            console.log(dataToEmit);
            io.sockets.emit("all options", dataToEmit);
            mutex.unlock();
        });
    });
    sc.on("next question", data => {
        io.sockets.emit("next", data);
    })
    sc.on("close quiz", async data => {
        await clean(data);
        io.sockets.emit("quiz ended", data[0]);
    })
    sc.on("reset options", async data => {
        await restore(data);
    })
});

app.use("/api/user", authRoute);
app.use("/api/events", eventHandler);
app.use("/api/actions", actionHandler);
app.use("/api/questions", questionHandler);
app.use("/api/options", optionHandler);