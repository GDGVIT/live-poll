//jshint esversion:6
const mutex = require("locks").createMutex();

const chooseOption = (req, _res) => {
    const io = req.app.get("socketio");
    io.on("connection", socket => {
        console.log("Connected")
        socket.on("option", data => {
            mutex.lock(() => {
                data.stat += 1;
                mutex.unlock();
            });
            socket.emit("option", data);
        });
    });
};

module.exports = chooseOption;