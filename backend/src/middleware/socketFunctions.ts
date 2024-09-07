import logger from "./logger";
import randomstring from "randomstring";

import { Socket } from "socket.io";
import { io } from "./app";

import Room from "./Classes/Room";
import Player from "./Classes/Player";
import { GameConfigStructure } from "./Classes/GameConfig";

const lobbies: Room[] = [];

export function joinRoom(socket: Socket, userId: string, roomId: string, name: string) {
   try {
      const room = lobbies.find(room => room.id === roomId);
      const player = new Player(name, userId, socket.id, false);

      if (room) {
         room.join(player);
      } else {
         socket.emit("Error", { errorMsg: "There is no room with id you search for" });
      }
      refreshPlayers(userId);
   } catch (err) {
      logger.error("Unexpected Error : " + err);
   }
}

export function createLobby(socket: Socket, host: Player): string | undefined {
   try {
      const date = new Date();
      const lobbyId = randomstring.generate(12);

      const room: Room = new Room(lobbyId, date.getTime(), host);
      lobbies.push(room);
      refreshPlayers(host.userId);
      return room.id;
   } catch (err) {
      logger.error("Unexpected Error : " + err);
   }
}

export function startGame(userId: string, gameConfig: GameConfigStructure) {
   const room = findRoomByPlayerId(userId);

   if (room?.playerList.some(player => player.userId === userId && player.isHost === true)) {
      room.beginGame(gameConfig);
      console.log("RECEIVED GAME CONF : ", gameConfig);

      const categories = room.gameConfig?.getCategories;
      console.log("sending game starting with categories : ", categories);
      room.playerList.forEach(player => {
         io.to(player.socketId).emit("gameStarted", { categories: categories });
      });
   } else {
      console.log("Denied, player who started the game is non host."); //dev
   }
}

export function refreshPlayers(userId: string) {
   try {
      console.log("Refreshing players list for userId : ", userId);
      if (userId) {
         const room: Room | null = findRoomByPlayerId(userId);
         let player: Player | undefined;
         if (room) {
            player = findPlayerById(userId, room.playerList);
         }

         if (room) {
            room.playerList.forEach((player) => {
               io.to(player.socketId).emit("refreshPlayers", { id: room.id, players: room.roomMates });
            });
         }
      }
   } catch (err) {
      logger.error("Unexpected Error : ", err);
   }
}

//Mulit-Usage functions :

function findRoomByPlayerId(userId: string): Room | null {
   const room: Room | null = lobbies.find(room => {
      return room.playerList.some(player => player.userId === userId);
   }) || null;
   return room;
}

function findPlayerById(playerId: string, playersList: Player[] | null): Player | undefined {
   const player = playersList?.find((player) => player.userId === playerId);
   return player;
}

//TODO :
// - Read deeply what SOLID is and use it in the project.