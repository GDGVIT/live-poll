//jshint esversion:6
const mutex = require("locks").createMutex();

const chooseOption = (req, res) => {
    const io = req.app.get("socketio");
    //console.log(io)
    io.on("connection", socket => {
        console.log("Connected")
        socket.on("option", data => {
            console.log(data)
            mutex.lock(() => {
                data.stat += 1;
                mutex.unlock();
                socket.emit("option", data);
                // socket.emit("option", data);
            });

        });
    });
};

module.exports = chooseOption;