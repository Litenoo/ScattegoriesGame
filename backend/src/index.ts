import express from 'express';
import cookieParser from 'cookie-parser';
import session from "express-session";
import cors from 'cors';
import randomstring from "randomstring";
import { Server, Socket } from "socket.io";
import { createServer } from "http";

import {joinRoom, createRoom, userDisconnection, refreshPlayers} from "./socketFunctions.js";


const app = express();
const server = createServer(app);
export const io = new Server(server,
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
      secret: process.env.SESSION_SECRET || "session-secret",
      saveUninitialized: true,
      resave: false,
      cookie: {
         secure: false, // Only set 'secure' to true in production for HTTPS
         httpOnly: true,
      }
   }),
);

app.get("/userID", (req, res)=>{
   res.send(randomstring.generate(12));
})

io.on('connection', (socket: Socket) => {
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

server.listen(3000, () => {
   console.log("Server is listening on 3000");
});

// Repair it so after clicking F5 it wont make list of players empty