import logger from "./middleware/logger.js";
import randomstring from "randomstring";

import data from './data.json' with {type: "json"};

import { Room, Player } from "./interfaces";
import { Socket } from "socket.io";
import { io } from "./index.js"

const rooms: Room[] = data.rooms;

export function joinRoom(socket: Socket, userId: string, roomId: string, name: string, isHost?: boolean) {
    try {
        const room = rooms.find(room => room.id === roomId);
        const user: Player = { userId: userId, socketId: socket.id, username: name, isHost: isHost };

        console.log("Trying to joinRoom. roomId : ", roomId, "username :", name, "isHost :", isHost, "room :", room);

        if (room) {
            room.players.push(user);
            refreshPlayers(userId);
        } else {
            socket.emit("Error", { errorMsg: "There is no room with id you search for" });
        }
    } catch (err) {
        logger.error("Unexpected Error : " + err);
    }
}
export function createRoom(): string | undefined {
    try {
        const date = new Date();
        const roomId = randomstring.generate(12);

        const room: Room = { id: roomId, players: [], created: date.getTime(), categories: [] };
        rooms.push(room);
        return room.id;
    } catch (err) {
        logger.error("Unexpected Error : " + err);
    }
}

export function userDisconnection(socket: Socket) {
    try {
        console.log("Player Disconnected !");
    } catch (err) {
        logger.error(err);
    }
}

export function refreshPlayers(userId: string, socketId) { //it is for one player only, chceck if it is ok ? either add for everyone in the room
    try {
        console.log("function refreshPlayers called with userId : ", userId);
        if (userId) {
            const room: Room | null = rooms.find(room => {  //It cannot find the room by some reason.
                return room.players.some(player => player.userId === userId);
            }) || null;

            console.log("function refreshPlayers room found : ", room);

            if (room) {
                room.players.forEach((player) => {
                    console.log("player in that room : ", player.username)
                    io.to(socketId).emit("refreshPlayers", { roomId: room.id, playerList: room.players }); //using socket id after it expires
                });
            }
        }

    } catch (err) {
        logger.error("Unexpected Error : ", err);
    }
}

// Check if players socket id saved in array is acctual anytime


/*
Issue #1

After refresh user sends disconnection request and being deleted from the array of room players.

The issue is caused because it is After the deletion of user from room.

How to resolve it ?

1.  Put info about room which user has joined in the browsers localstorage may be cumbersome

2.  Do not delete user from the playerList of the roomn may be cumbersome but not as bad as 1.

 */