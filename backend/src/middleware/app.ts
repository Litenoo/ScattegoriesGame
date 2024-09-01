import express from 'express';
import session from "express-session";
import randomstring from "randomstring";
import cors from 'cors';
import { Server, Socket } from "socket.io";
import { createServer } from "http";

import logger from "./logger.js";
import { joinRoom, createLobby, refreshPlayers, startGame } from "./socketFunctions.js";
import Player from './Classes/Player.js';

const app = express();
export const server = createServer(app);
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

app.get("/userID", (req, res) => {
   try {
      const userId = randomstring.generate(12);
      res.status(200);
      res.send(userId);
   } catch (err) {
      logger.error("Error generating user Id: ", err);
      res.status(500).send("Internal Server Error.");
   }
});

io.on('connection', (socket: Socket) => {
   socket.on('createRoom', (userId: string, username: string) => {
      try {
         const host = new Player(username, userId, socket.id, true);
         const roomId = createLobby(socket, host);
      } catch (err) {
         logger.error(err);
      }
   });

   socket.on("refreshPlayers", (userId) => {
      refreshPlayers(userId, socket.id);
   });

   socket.on("startGame", (userId) => { // validate if user is host // Btw here will be gameConfig config sent as prop
      // startGame(userId);
   })

   socket.on('joinRoom', (userId, roomId, username) => {
      console.log("/joinRoom")
      joinRoom(socket, userId, roomId, username);
   })

});