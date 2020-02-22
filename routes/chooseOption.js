//jshint esversion:6
const router = require("express").Router();
const mutex = require("locks").createMutex();
router.get("/", (req, _res) => {
  const io = req.app.get("socketio");
  io.on("connection", socket => {
    socket.on("option", data => {
      mutex.lock(()=>{
        data.stat += 1;
        mutex.unlock();
      });
      io.emit("option", data);
    });
  });
});
module.exports = router;
