// make express available for ./src/index.html and send data to the client
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

let waitlist = [];
let guide = null;
let guest = null;

io.on("connection", (socket) => {
  socket.on("enter", (content) => {
    if (content.msg === "guide" && guide === null) {
      guide = socket.id;
    } else if (content.msg === "guest" && guest === null) {
      guest = socket.id;
      socket.emit("enterReply", "success");
    } else if (content.msg === "guest" && guest !== null) {
      waitlist.push(socket.id);

      socket.emit("enterReply", "waitlist");
    } else if (content.msg === "guide-success") {
      console.log("guide-success");
      socket.emit("planningDone", "dive-computer");
    }
  });

  socket.on("disconnect", () => {
    if (socket.id === guide) {
      guide = null;
    } else if (socket.id === guest) {
      guest = null;
      if (waitlist.length > 0) {
        guest = waitlist[0];
        waitlist = waitlist.slice(1);
        io.to(guest).emit("enterReply", "success");
      }
    } else {
      waitlist = waitlist.filter((id) => id !== socket.id);
    }
  });
});

httpServer.listen(3000);
