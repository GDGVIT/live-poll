//jshint esversion:6
module.exports = {
  start: io => {
    io.on("connection", socket => {
      socket.on("option", data => {
        data.stat += 1;
        io.sockets.emit("option", data);
      });
    });
  }
};
