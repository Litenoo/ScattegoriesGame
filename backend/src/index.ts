import express, { raw } from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import randomstring from "randomstring";
import { Server, Socket } from "socket.io";
import { createServer } from "http";

import { Room, Player } from "./interfaces";
import logger from "./middleware/logger.js";

const app = express();
const server = createServer(app);
const io = new Server(server,
    {
        cors: {
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST'],
            credentials: true,
        }
    });

app.use(
    express.json(),
    cookieParser(),
    express.urlencoded({ extended: true }),
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true,
    }),
    session({
        secret: process.env.SESSION_SECRET as string || "session-secret",
        saveUninitialized: true,
        resave: false,
        cookie: {
            secure: false, // Only set 'secure' to true in production for HTTPS
            httpOnly: true,
        }
    }),
);

function joinRoom(socket: Socket, roomId: string, username: string, isAdmin?: boolean) {
    try {
        console.log("joinRoom : ", roomId, username);

        const room = rooms.find(room => room.id = roomId);
        const user : Player = {socketId : socket.id, username: username, isAdmin: isAdmin};

        if (room) {
            room.players.push(user);
        } else {
            socket.emit("Error", { errorMsg: "There is no room with id you search for" });
        }
        refreshPlayers(socket, user);
    } catch (err) {
        logger.error("Unexpected Error : " + err);
        console.log(err);
    }
}

function createRoom(): string | undefined {
    try {
        const date = new Date();
        const roomId = randomstring.generate(12);

        const room: Room = { id: roomId, players: [], created: date.getTime() };
        rooms.push(room);
        return room.id;
    } catch (err) {
        logger.error("Unexpected Error : " + err);
        console.log(err);
    }
}


function refreshPlayers(socket: Socket, user) {
    try {
        const room = rooms.find(room => room.players.some(player => user.socketId === player.socketId));
        if (room) {
            socket.emit("refreshPlayers", room.players);
            io.to(user.socketId).emit("refreshPlayers", room.players);
        };
    } catch (err) {
        logger.error("Unexpected Error : " + err);
        console.log(err);
    }
}

const rooms: Room[] = [];

io.on('connection', (socket: Socket) => {
    console.log('User connected');
    socket.on('disconnect', () => console.log("User disconnected"));

    socket.on('createRoom', (username) => {
        const roomId = createRoom();
        if(roomId){
            joinRoom(socket, roomId, username, true);
        }
    });
    socket.on('joinRoom', (roomId, username) => joinRoom(socket, roomId, username));
});


server.listen(3000, () => {
    console.log("Server is listening on 3000");
});