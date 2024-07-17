import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import { Server } from "socket.io";
import { createServer } from "http";
import { v4 as uuid } from "uuid";
import roomManagement from "./routes/roomManagement.js";
import generateName from "./routes/middleware/nameGenerator.js";
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
    }
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));
app.use(session({
    secret: process.env.SESSION_SECRET || "session-secret",
    saveUninitialized: true,
    resave: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
    }
}));
const rooms = [];
app.use(roomManagement);
io.on('connection', (socket) => {
    console.log('User connected');
    const socketId = socket.id;
    socket.on('createRoom', (socket) => {
        try {
            const userData = { username: generateName(), id: socketId };
            const roomId = "r-" + uuid();
            const date = new Date();
            const room = { id: roomId, players: [userData], created: date.getTime() };
            rooms.push(room);
            console.log("New room : ", room);
        }
        catch (err) {
            console.log(err);
        }
    });
    socket.on('disconnect', (socket) => {
        console.log("User disconnected");
    });
});
server.listen(3000, () => {
    console.log("Server is listening on 3000");
});
