const { Server } = require("socket.io");
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

app.use(express.static("public"));
server.listen(8000, () => {
    console.log("Listening on port 8000");
});

const io = new Server(server);

io.on("connection", (socket) => {
    const ip = socket.handshake.address;
    console.log(`Connected ${ip}`);
    socket.on("message", (message) => {
        console.log("Received: " + message);
        io.emit("message", message);
    });
    socket.on("disconnect", () => {
        console.log(`Disconnected ${ip}`);
    });
});
