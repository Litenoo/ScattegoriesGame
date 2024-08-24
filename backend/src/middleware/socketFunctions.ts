import logger from "./logger";
import randomstring from "randomstring";

import { Socket } from "socket.io";
import { io } from "./app";

import Room from "./Classes/Room";
import Player from "./Classes/Player";
import Settings from "./Classes/Settings";

const lobbies: Room[] = [];

export function joinRoom(socket: Socket, userId: string, roomId: string, name: string, isHost = false) {
   try {
      const room = lobbies.find(room => room.id === roomId);
      const player = new Player(name, userId, socket.id, isHost);

      if (room) {
         room.players.push(player);
      } else {
         socket.emit("Error", { errorMsg: "There is no room with id you search for" });
      }
      refreshPlayers(userId, socket.id);
   } catch (err) {
      logger.error("Unexpected Error : " + err);
   }
}

export function createLobby(): string | undefined {
   try {
      const date = new Date();
      const lobbyId = randomstring.generate(12);

      const room: Room = new Room(lobbyId, date.getTime());
      lobbies.push(room);
      return room.id;
   } catch (err) {
      logger.error("Unexpected Error : " + err);
   }
}

export function startGame(userId: string, categories: string[], settings: Settings) {
   const room = findRoomByPlayerId(userId);

   if (room?.players.some(player => player.userId === userId && player.isHost === true)) {
      console.log("Accepted, starting game !");
   }
}

export function refreshPlayers(userId: string, socketId: string) {
   try {
      console.log("Refreshing players list for userId : ", userId);
      if (userId) {
         const room: Room | null = findRoomByPlayerId(userId);
         let player: Player | undefined;
         if (room) {
            player = findPlayerById(userId, room.players);
         }

         if (room) {
            room.players.forEach((player) => {
               if (player.socketId !== socketId) { //filters to avoid sending response more than once
                  io.to(player.socketId).emit("refreshPlayers", { roomId: room.id, playerList: room.players });
               }
            });
            io.to(socketId).emit("refreshPlayers", { roomId: room.id, playerList: room.players });
         }
      }
   } catch (err) {
      logger.error("Unexpected Error : ", err);
   }
}

//Mulit-Usage functions :

function findRoomByPlayerId(userId: string): Room | null {
   const room: Room | null = lobbies.find(room => {
      return room.players.some(player => player.userId === userId);
   }) || null;
   return room;
}

function findPlayerById(playerId: string, playersList: Player[] | null): Player | undefined {
   const player = playersList?.find((player) => player.getUserId === playerId);
   return player;
}