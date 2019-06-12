const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
// const axios = require("axios");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const port = process.env.PORT || 4000;
const index = require("./app/routes/index");

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log("db connected"))
  .catch(e => {
    console.log("Error, exiting", e);
    process.exit();
  });

const app = express();
app.use(index);

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./app/routes/questions.routes.js")(app);
require("./app/routes/answers.routes.js")(app);

const server = http.createServer(app);

const io = socketIo(server, { pingTimeout: 60000 }); // initialiseer socket

let connectionCounter = 0;

io.on("connection", socket => {
  // User connected
  console.log(`${socket.id} connected to the site`);

  // User disconnected
  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected from the site`);
  });

  // Join a custom room created by the admin
  socket.on("join", ({ room, user }) => {
    socket.join(room);
    console.log("room: " + room + " joined by:" + socket.id);

    // Als een speler de room joint, verhoog de spelercount
    if (user === "player") {
      connectionCounter++;
    }

    // Stuur de spelercount door als iemand verbindt
    //socket.emit("player count", connectionCounter);
    io.to(room).emit("player count", connectionCounter);
    console.log(`aantal spelers:`, connectionCounter);

    // Vraag doorsturen
    socket.on("question", ({ question, room }) => {
      console.log(`question emit`, room);
      io.to(room).emit("question", question);
    });
    // Antwoord doorsturen
    socket.on("answer", ({ answer, room }) => {
      console.log(`answer emit`);
      io.to(room).emit("answer", answer);
    });
    // Projectie clearen
    socket.on("clear", ({ message, room }) => {
      console.log(`clear emit`);
      io.to(room).emit("clear", message);
    });

    socket.on("tijd op", room => {
      io.to(room).emit("tijd op");
    });

    socket.on("disconnect", () => {
      if (user === "player") {
        connectionCounter--;
        console.log(`player disconnected`);
      }

      console.log(connectionCounter);
      console.log(`user: ${socket.id} left room: ${room}`);
    });
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

server.listen(port, () => console.log(`Listening on port ${port}`));
