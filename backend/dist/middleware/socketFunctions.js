"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startGame = exports.refreshPlayers = exports.createLobby = exports.joinRoom = void 0;
const logger_1 = __importDefault(require("./logger"));
const randomstring_1 = __importDefault(require("randomstring"));
const app_1 = require("./app");
const lobbies = [];
function joinRoom(socket, userId, roomId, name, isHost) {
    try {
        const room = lobbies.find(room => room.id === roomId);
        const user = { userId: userId, socketId: socket.id, username: name, isHost: isHost };
        if (room) {
            room.players.push(user);
        }
        else {
            socket.emit("Error", { errorMsg: "There is no room with id you search for" });
        }
        refreshPlayers(userId, socket.id);
    }
    catch (err) {
        logger_1.default.error("Unexpected Error : " + err);
    }
}
exports.joinRoom = joinRoom;
function createLobby() {
    try {
        const date = new Date();
        const lobbyId = randomstring_1.default.generate(12);
        const room = { id: lobbyId, players: [], created: date.getTime(), categories: [] };
        lobbies.push(room);
        return room.id;
    }
    catch (err) {
        logger_1.default.error("Unexpected Error : " + err);
    }
}
exports.createLobby = createLobby;
function refreshPlayers(userId, socketId) {
    try {
        console.log("Refreshing players list for userId : ", userId);
        if (userId) {
            const room = findRoomByPlayerId(userId);
            if (room) {
                room.players.forEach((player) => {
                    if (player.socketId !== socketId) {
                        app_1.io.to(player.socketId).emit("refreshPlayers", { roomId: room.id, playerList: room.players });
                    }
                });
                app_1.io.to(socketId).emit("refreshPlayers", { roomId: room.id, playerList: room.players });
            }
        }
    }
    catch (err) {
        logger_1.default.error("Unexpected Error : ", err);
    }
}
exports.refreshPlayers = refreshPlayers;
function startGame(userId) {
    const room = findRoomByPlayerId(userId);
    if (room?.players.some(player => player.userId === userId && player.isHost === true)) {
        console.log("Accepted, starting game !");
    }
}
exports.startGame = startGame;
function findRoomByPlayerId(userId) {
    const room = lobbies.find(room => {
        return room.players.some(player => player.userId === userId);
    }) || null;
    return room;
}
