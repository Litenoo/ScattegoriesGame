import logger from "./logger";
import randomstring from "randomstring";

import { Room, Player } from "../interfaces";
import { Socket } from "socket.io";
import { io } from "./app";

const lobbies: Room[] = [];

export function joinRoom(socket: Socket, userId: string, roomId: string, name: string, isHost?: boolean) {
    try {
        const room = lobbies.find(room => room.id === roomId);
        const user: Player = { userId: userId, socketId: socket.id, username: name, isHost: isHost };

        if (room) {
            room.players.push(user);
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

        const room: Room = { id: lobbyId, players: [], created: date.getTime(), categories: [] };
        lobbies.push(room);
        return room.id;
    } catch (err) {
        logger.error("Unexpected Error : " + err);
    }
}

export function refreshPlayers(userId: string, socketId) { //it is for one player only, chceck if it is ok ? either add for everyone in the room
    try {
        console.log("Refreshing players list for userId : ", userId);
        if (userId) {
            const room: Room | null = findRoomByPlayerId(userId);

            if (room) { //refactor
                room.players.forEach((player) => {
                    if(player.socketId !== socketId){
                        io.to(player.socketId).emit("refreshPlayers", { roomId: room.id, playerList: room.players }); //using socket id after it possibly expires
                    }
                });
                io.to(socketId).emit("refreshPlayers", { roomId: room.id, playerList: room.players });
            }
        }
    } catch (err) {
        logger.error("Unexpected Error : ", err);
    }
}

export function startGame(userId: string) {
    const room = findRoomByPlayerId(userId);

    if (room?.players.some(player => player.userId === userId && player.isHost === true)) {
        console.log("Accepted, starting game !");
    }
}

function findRoomByPlayerId(userId) {
    const room: Room | null = lobbies.find(room => {
        return room.players.some(player => player.userId === userId);
    }) || null;
    return room;
}