const path = require("path");
const http = require("http");
const messageModel = require('./models/Message')
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./messageFormat");
const {joinUser,getCurrentUser, deleteUser} = require("./users");
const app = express();
const PORT = 3000 || process.env.PORT;
const server = http.createServer(app);
const io = socketio(server);
const ai = "ChatApp";
const db = require("./db")
app.use(express.static(path.join(__dirname, "public")));
const router = require('./routes/router')
app.use(express.json())
app.use(router)

io.on("connection", (socket) => {

   socket.on("joinRoom", async ({ username, room }) => {
     const user = joinUser(socket.id, username, room);
     socket.join(user.room);
     socket.emit("message", formatMessage(ai, "Welcome to chatCord"));

    //loading all previous messages
      const prevmessages = await messageModel.find({room : user.room});
      try {
          if(prevmessages.length != 0){
            //try to emit here
            socket.emit('prevMessages', prevmessages)
          }
        } catch (err) {
          res.status(500).send(err);
        }

    //everyone except user connecting
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(ai, `${user.username} has joined the chat`)
      );
    io.to(user.room).emit("roomUsers", {
      room: user.room
    });
  });

  //listening for chat message
  socket.on("chatMessage", async (msg) => {
    const user = getCurrentUser(socket.id);
    //emit to that room
    const messageContent = new messageModel({
      "from_user": user.username,
      "room" : user.room,
      "message" : msg
    });
    try {
        await messageContent.save((err) => {
          if(err){
            res.send(err)
          }
        });
      } catch (err) {
        res.status(500).send(err);
      }
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  //everyone
  //io.emit()
  socket.on("disconnect", () => {
    const user = deleteUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(ai, `${user.username} has left the chat`)
      );
    }
  });
});


server.listen(PORT, () => console.log(`server running on port ${PORT}`));
