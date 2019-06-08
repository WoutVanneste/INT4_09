const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");

const port = process.env.PORT || 4000;
const index = require("./app/routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server); // < Interesting!

// const getApiAndEmit = async socket => {
//   try {
//     const res = await axios.get(
//       "https://api.darksky.net/forecast/80020a30b58f7a737643c06fcada38de/37.8267,-122.4233"
//     ); // Getting the data from DarkSky
//     socket.emit("FromAPI", res.data.currently.temperature); // Emitting a new message. It will be consumed by the client
//   } catch (error) {
//     console.error(`Error: ${error.code}`);
//   }
// };

io.on("connection", socket => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// io.on("connection", socket => {
//   socket.on("number update", msg => {
//     io.emit("number update", msg);
//   });
// });

io.on("connection", socket => {
  socket.on("question", msg => {
    console.log(`question emit`);
    io.emit("question", msg);
  });
});

io.on("connection", socket => {
  socket.on("answer", msg => {
    console.log(`answer emit`);
    io.emit("answer", msg);
  });
});

// let interval;

// io.on("connection", socket => {
//   console.log("New client connected");
//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => getApiAndEmit(socket), 10000);
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

server.listen(port, () => console.log(`Listening on port ${port}`));
