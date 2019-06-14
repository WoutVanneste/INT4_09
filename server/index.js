const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const socketIo = require("socket.io");
const app = express();
const server = require("http").Server(app);

// const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .catch(e => {
    process.exit();
  });

app.use(express.static(path.resolve(__dirname, "../client/build")));

// app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./app/routes/answers.routes.js")(app);
require("./app/routes/questions.routes.js")(app);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.get("/api/data", (req, res) => {
  res.send({ message: "ok", secret: process.env.SECRET });
});

const io = socketIo(server, { pingTimeout: 60000 }); // initialiseer socket

// Socket io code
//let connectionCounter = 0;
let connectionCounter = {};

io.on("connection", socket => {
  // User connected

  // User disconnected
  socket.on("disconnect", () => {});

  // Join a custom room created by the admin
  socket.on("join", ({ room, user }) => {
    socket.join(room);

    // Als een speler de room joint, verhoog de spelercount
    if (user === "player") {
      if (connectionCounter[room] == undefined) {
        connectionCounter[room] = 1;
        io.to(room).emit("player count", connectionCounter[room]);
      } else {
        connectionCounter[room]++;
        io.to(room).emit("player count", connectionCounter[room]);
      }
      // Stuur de spelercount door als een speler verbindt
    }

    socket.on("get players", room => {
      if (connectionCounter[room] != undefined) {
        io.to(room).emit("player count", connectionCounter[room]);
      }
    });

    // Vraag doorsturen
    socket.on("question", ({ question, room }) => {
      io.to(room).emit("question", question);
    });
    // Antwoord doorsturen
    socket.on("answer", ({ answer, room }) => {
      io.to(room).emit("answer", answer);
    });
    // Projectie clearen
    socket.on("clear", ({ message, room }) => {
      io.to(room).emit("clear", message);
    });

    socket.on("tijd op", room => {
      io.to(room).emit("tijd op");
    });

    socket.on("disconnect", () => {
      if (user === "player") {
        connectionCounter[room]--;
      }

      io.to(room).emit("player count", connectionCounter[room]);
    });
  });
});

server.listen(process.env.PORT, () => {});
