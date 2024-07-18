import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import randomstring from "randomstring";
import { Server, Socket } from "socket.io";
import { createServer } from "http";

import { Room } from "./interfaces";
import generateName from "./nameGenerator.js";
import logger from "./logger.js";

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
        allowedHeaders: ['Content-Type'],
        credentials: true,
    }),
    session({
        secret: process.env.SESSION_SECRET as string || "session-secret",
        saveUninitialized: true,
        resave: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production', // Only set 'secure' to true in production for HTTPS
            httpOnly: true,
        }
    }),
);

function joinRoom(socket: Socket, data : string){
    try{
        console.log("joinRoom : ", data);
        const roomId = data;
        const room = rooms.find(room => room.id = roomId);
        room?.players.push({username : generateName(), id : socket.id});
        refreshPlayers(socket);
    }catch(err){
        logger.error("52",err);
    }
}

function createRoom(socket: Socket) {
    try {
        const socketId = socket.id;
        const userData = { username: generateName(), id: socketId };

        const roomId = randomstring.generate(12);
        const date = new Date();
        const room: Room = { id: roomId, players: [userData], created: date.getTime() };

        rooms.push(room);
        console.log("New room : ", room);
        setTimeout(()=>{
            refreshPlayers(socket);
        }, 600)

    } catch (err) {
        logger.error("72",err);
    }
}

function refreshPlayers(socket: Socket) {
    try {
        const activeRoom = rooms.find(room => room.players.some(player => player.id === socket.id));
        if (activeRoom) {
            socket.emit("refreshPlayers", activeRoom.players);
            activeRoom.players.forEach((player) => {
                io.to(player.id).emit("refreshPlayers", activeRoom.players);
            });
        };
    } catch (err) {
        logger.error("86", err);
    }
}

const rooms: Room[] = [];

io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('disconnect', () => console.log("User disconnected"));

    socket.on('createRoom', () => createRoom(socket));
    socket.on('joinRoom', (data)=> joinRoom(socket, data));
});


server.listen(3000, () => {
    console.log("Server is listening on 3000");
});