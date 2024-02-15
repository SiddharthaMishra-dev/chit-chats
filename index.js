const express = require("express");
const app = express();

const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.static("./client/dist"));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

function leaveRoom(userID, chatRoomUsers) {
  return chatRoomUsers.filter((user) => user.id != userID);
}

const CHAT_BOT = "ChatBot";

let allUser = [];

io.on("connection", (socket) => {
  console.log(`user ${socket.id} connected`);
  socket.on("joinRoom", (data) => {
    const { username } = data;
    socket.join("chit-chats");

    //send message from server to room

    let __createdTime__ = Date.now();

    io.emit("acknowledge", {
      message: `${username} has joined the room`,
    });

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
    io.in("chit-chats").emit("room_users", allUser);
  });

  socket.on("send_message", (data) => {
    const { username, message, __createdTime } = data;
    io.in("chit-chats").emit("receive_message", data);
  });

  socket.on("leaveRoom", (data) => {
    socket.leave("chit-chats");
    const __createdTime__ = Date.now();
    allUser = leaveRoom(socket.id, allUser);
    io.emit("room_users", allUser);
    io.emit("receive_message", {
      username: CHAT_BOT,
      message: `${data.username} has left the chat`,
      __createdTime__,
    });
  });
});

server.listen(PORT, () => "server is running on PORT 4000");
