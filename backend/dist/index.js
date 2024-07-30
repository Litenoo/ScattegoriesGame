import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import randomstring from "randomstring";
import { Server } from "socket.io";
import { createServer } from "http";
import logger from "./middleware/logger.js";
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true,
    }
});
app.use(express.json(), cookieParser(), express.urlencoded({ extended: true }), cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
}), session({
    secret: process.env.SESSION_SECRET || "session-secret",
    saveUninitialized: true,
    resave: false,
    cookie: {
        secure: false,
        httpOnly: true,
    }
}));
const rooms = [];
function joinRoom(socket, roomId, name, isHost) {
    try {
        const room = rooms.find(room => room.id === roomId);
        const user = { socketId: socket.id, username: name, isHost: isHost };
        if (room) {
            room.players.push(user);
        }
        else {
            socket.emit("Error", { errorMsg: "There is no room with id you search for" });
        }
        console.log("joinRoom. roomId : ", roomId, "username :", name, "isHost :", isHost, "room :", room);
        if (room) {
            refreshPlayers(room.players);
        }
    }
    catch (err) {
        logger.error("Unexpected Error : " + err);
    }
}
function createRoom() {
    try {
        const date = new Date();
        const roomId = randomstring.generate(12);
        const room = { id: roomId, players: [], created: date.getTime() };
        rooms.push(room);
        return room.id;
    }
    catch (err) {
        logger.error("Unexpected Error : " + err);
    }
}
function userDisconnection(socket) {
    try {
        rooms.find((room, roomIndex) => room.players.some((player, playerIndex) => {
            if (socket.id === player.socketId) {
                rooms[roomIndex].players.splice(playerIndex, 1);
                return true;
            }
        }));
    }
    catch (err) {
        logger.error(err);
    }
}
function refreshPlayers(socketId) {
    try {
        const room = rooms.find((room) => {
            return room.players.some((player) => player.socketId === socketId);
        }) || null;
        if (room) {
            room.players.forEach((player) => {
                io.to(player.socketId).emit("refreshPlayers", room.players);
            });
        }
    }
    catch (err) {
        logger.error("Unexpected Error : ", err);
    }
}
io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('disconnect', () => userDisconnection(socket));
    socket.on('createRoom', (username) => {
        const roomId = createRoom();
        if (roomId) {
            joinRoom(socket, roomId, username, true);
        }
    });
    socket.on("refreshPlayers", (socketId) => {
        console.log("refreshPlayers request received with socketId = ", socketId);
        refreshPlayers(socketId);
    });
    socket.on('joinRoom', (roomId, username) => joinRoom(socket, roomId, username, false));
});
server.listen(3000, () => {
    console.log("Server is listening on 3000");
});
