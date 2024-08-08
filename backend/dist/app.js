import express from 'express';
import cookieParser from 'cookie-parser';
import session from "express-session";
import cors from 'cors';
import randomstring from "randomstring";
import { Server } from "socket.io";
import { createServer } from "http";
import logger from "./middleware/logger.js";
import { joinRoom, createRoom, userDisconnection, refreshPlayers } from "./socketFunctions.js";
const app = express();
export const server = createServer(app);
export const io = new Server(server, {
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
app.get("/userID", (req, res) => {
    try {
        const userId = randomstring.generate(12);
        res.send(userId);
    }
    catch (err) {
        logger.error("Error generating user Id: ", err);
        res.status(500).send("Internal Server Error.");
    }
});
io.on('connection', (socket) => {
    io.to(socket.id).emit("setUserId", randomstring.generate(12));
    socket.on('disconnect', () => userDisconnection(socket));
    socket.on('createRoom', (userId, username) => {
        const roomId = createRoom();
        if (roomId) {
            joinRoom(socket, userId, roomId, username, true);
        }
    });
    socket.on("refreshPlayers", (userId) => {
        console.log("refreshPlayers request received with userId = ", userId);
        refreshPlayers(userId, socket.id);
    });
    socket.on('joinRoom', (userId, roomId, username) => joinRoom(socket, userId, roomId, username, false));
});
