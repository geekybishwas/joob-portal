import express from "express";

import http from "http";

const app = express();

const server = http.createServer(app);

import { Server } from "socket.io";

// __dirname and __filename is not available in es6 by default
import path from "path";
import { fileURLToPath } from "url";
import { contentSecurityPolicy } from "helmet";

// Get __dirname equivalent in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const io = new Server(server);

const PORT = 3000;

app.get("/", (req, res) => {
  var options = {
    root: path.join(__dirname),
  };

  var file_name = "index.html";

  res.sendFile(file_name, options);
});

/*
Server side Events:
    -connection
    -disconnection
    -message
    -reconnect
    -ping
    -join
    -leave

Client side Events:
    -connect
    -connect_error
    -connect_timeout
    -reconnect
*/

var clients = 0;

var room_no = 1;

var full = 0;

// socket
io.on("connection", (socket) => {
  console.log(`A user connected`);

  // Subscribe the socket to the given channel
  socket.join(`room-${room_no}`);

  io.to(`room-${room_no}`).emit(
    `connect-${room_no}`,
    `You are connected to room${room_no}`
  );

  full++;

  if (full >= 2) {
    full = 0;
    room_no++;
  }

  clients++;

  // This will send the new user a welcome msg and update the other clients about total no.of clients connected
  socket.emit("new_client_connected", "Hey,welcome");

  socket.broadcast.emit(
    "new_client_connected",
    `No of clients connected : ${clients}`
  );

  /*
  
  // This will  emit the event to all the connected clients
  io.sockets.emit("broadcast", `No of clents connected : ${clients}`);


  // Sending data from server side to client side
  setTimeout(() => {
    socket.emit("message", "A small msg from server");
  }, 3000);

  // Getting data from client
  socket.on("message_from_client", (data) => [console.log(data)]);

  */
  socket.on("disconnect", () => {
    console.log(`A user disconnected`);

    clients--;

    socket.broadcast.emit(
      "new_client_connected",
      `No of clients connected : ${clients}`
    );
  });
});

server.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
