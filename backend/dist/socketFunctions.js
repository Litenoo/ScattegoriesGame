import logger from "./middleware/logger.js";
import randomstring from "randomstring";
import data from './data.json' with { type: "json" };
import { io } from "./index.js";
const rooms = data.rooms;
export function joinRoom(socket, userId, roomId, name, isHost) {
    try {
        const room = rooms.find(room => room.id === roomId);
        const user = { userId: userId, socketId: socket.id, username: name, isHost: isHost };
        console.log("Trying to joinRoom. roomId : ", roomId, "username :", name, "isHost :", isHost, "room :", room);
        if (room) {
            room.players.push(user);
            refreshPlayers(userId);
        }
        else {
            socket.emit("Error", { errorMsg: "There is no room with id you search for" });
        }
    }
    catch (err) {
        logger.error("Unexpected Error : " + err);
    }
}
export function createRoom() {
    try {
        const date = new Date();
        const roomId = randomstring.generate(12);
        const room = { id: roomId, players: [], created: date.getTime(), categories: [] };
        rooms.push(room);
        return room.id;
    }
    catch (err) {
        logger.error("Unexpected Error : " + err);
    }
}
export function userDisconnection(socket) {
    try {
        console.log("Player Disconnected !");
    }
    catch (err) {
        logger.error(err);
    }
}
export function refreshPlayers(userId, socketId) {
    try {
        console.log("function refreshPlayers called with userId : ", userId);
        if (userId) {
            const room = rooms.find(room => {
                return room.players.some(player => player.userId === userId);
            }) || null;
            console.log("function refreshPlayers room found : ", room);
            if (room) {
                room.players.forEach((player) => {
                    console.log("player in that room : ", player.username);
                    io.to(socketId).emit("refreshPlayers", { roomId: room.id, playerList: room.players });
                });
            }
        }
    }
    catch (err) {
        logger.error("Unexpected Error : ", err);
    }
}
