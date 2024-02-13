const express = require("express");
const app = express();

const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const CHAT_BOT = "ChatBot";

let allUser = [];

io.on("connection", (socket) => {
  console.log(`user ${socket.id} connected`);
  socket.on("joinRoom", (data) => {
    const { username } = data;
    socket.join("chit-chats");

    //send message from server to room

    let __createdTime__ = Date.now();

    socket.emit("receive_message", {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      __createdTime__,
    });

    socket.to("chit-chats").emit("receive_message", {
      message: `${username} has joined the chat`,
      username: CHAT_BOT,
      __createdTime__,
    });

    allUser.push({
      id: socket.id,
      username,
    });
  });
  socket.emit("room_users", allUser);

  socket.on("send_message", (data) => {
    const { username, message, __createdTime } = data;

    io.in("chit-chats").emit("receive_message", data);
  });
});

server.listen(4000, () => "server is running on PORT 4000");
