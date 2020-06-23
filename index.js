//jshint esversion:6
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const socket = require("socket.io");
const redis = require("redis");
const {promisify} = require("util");
const http = require('http');
const https = require('https');
const fs = require("fs");
const morgan = require("morgan")

const allowedOrigins = ["https://poll.dscomg.com","https://hermes.dscvit.com","https://dsc-hermes.netlify.app","http://103.240.96.114","http://122.178.238.54"]
//Middleware
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
dotEnv.config();
app.use(cors({
	origin: function(origin, callback){
		callback(null, true)
	},credentials: true
}));
app.use(morgan("dev"))
//Connect to Database
mongoose.connect(
	process.env.DB_CONNECTION, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	}
)
	.then(() => console.log("Connected to DB"))
	.catch(err => {
		console.log(err)
	});
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

// setting up HTTP(s) servers
/* const httpServer = http.createServer(app);
let server = httpServer.listen(process.env.PORT || 3000, () => {
	console.log("listening on HTTP");
}); */
const privateKey  = fs.readFileSync('./sslcert/privkey.pem', 'utf8');
const certificate = fs.readFileSync('./sslcert/cert.pem', 'utf8');
const httpsServer = https.createServer({key: privateKey, cert: certificate}, app);
const server = httpsServer.listen(process.env.SSL_PORT || 3443);
console.log("Listening on HTTPS");

const io = socket(server);

//Calling all routes
const authRoute = require("./routes/auth");
const eventHandler = require("./routes/eventHandler");
const actionHandler = require("./routes/actionHandler");
const questionHandler = require("./routes/questionHandler");
const optionHandler = require("./routes/optionHandler");

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
		stat = parseInt(stat);
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
	console.log("Connected");
	sc.on("disconnect", () => {
		console.log("Disconnected");
	});
	sc.on("option", async option_id => {
		let dataToEmit = await increment(option_id);
		console.log(dataToEmit);
		io.sockets.emit("all options", dataToEmit);
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
}
