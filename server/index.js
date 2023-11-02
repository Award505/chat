const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
const PORT = 5000;
const routes = require("./routes");
const { Sequelize } = require("sequelize");
const { connection } = require("./db/connection");
const { addUser, findUser, getRoomUsers, removeUser } = require("./users");
const Room = require("./models/rooms");

app.use(cors({ origin: "*" }));
app.use(routes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }) => {
    socket.join(room);

    const { user, isExist } = addUser({ name, room });

    const userMessage = isExist
      ? `${user.name}, а вот снова и он`
      : `Ну, здравству, здравствуй,  ${user.name}, мордастый`;

    socket.emit("message", {
      data: { user: { name: "Admin" }, message: userMessage },
    });

    socket.broadcast.to(user.room).emit("message", {
      data: { user: { name: "Admin" }, message: `${user.name} has joined` },
    });

    io.to(user.room).emit("room", {
      data: { users: getRoomUsers(user.room) },
    });
  });

  socket.on("sendMessage", ({ message, params }) => {
    const user = findUser(params);

    if (user) {
      io.to(user.room).emit("message", { data: { user, message } });
    }
  });

  socket.on("leftRoom", ({ params }) => {
    const user = removeUser(params);

    if (user) {
      const { room, name } = user;

      io.to(room).emit("message", {
        data: { user: { name: "Admin" }, message: `${name} has left` },
      });

      io.to(room).emit("room", {
        data: { users: getRoomUsers(room) },
      });
    }
  });

  io.on("disconnect", () => {
    console.log("Disconnect");
  });
});

const start = async () => {
  try {
    await connection.authenticate();
    console.log("Connection has been established successfully.");

    await connection.sync({ force: true });
    console.log("Table created successfully.");

    const rooms = new Room();
    rooms.fillBase();

    server.listen(PORT, () => console.log("Server started on", PORT));
  } catch (e) {
    console.log(e);
  }
};

start();
