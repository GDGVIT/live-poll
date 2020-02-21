//jshint esversion:6
const router = require("express").Router();

router.get("/", (req, _res) => {
  const io = req.app.get("socketio");
  io.on("connection", socket => {
    socket.on("option", data => {
      data.stat += 1;
      io.sockets.emit("option", data);
    });
  });
});
module.exports = router;
