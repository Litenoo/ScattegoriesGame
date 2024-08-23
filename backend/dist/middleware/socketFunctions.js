"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinRoom = joinRoom;
exports.createLobby = createLobby;
exports.refreshPlayers = refreshPlayers;
exports.startGame = startGame;
const logger_1 = __importDefault(require("./logger"));
const randomstring_1 = __importDefault(require("randomstring"));
const app_1 = require("./app");
const Player_1 = __importDefault(require("./Classes/Player"));
const Room_1 = __importDefault(require("./Classes/Room"));
const lobbies = [];
function joinRoom(socket, userId, roomId, name, isHost = false) {
    try {
        const room = lobbies.find(room => room.id === roomId);
        const player = new Player_1.default(name, userId, socket.id, isHost);
        if (room) {
            room.players.push(player);
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
function createLobby() {
    try {
        const date = new Date();
        const lobbyId = randomstring_1.default.generate(12);
        const room = new Room_1.default(lobbyId, date.getTime());
        lobbies.push(room);
        return room.id;
    }
    catch (err) {
        logger_1.default.error("Unexpected Error : " + err);
    }
}
function refreshPlayers(userId, socketId) {
    try {
        console.log("Refreshing players list for userId : ", userId);
        if (userId) {
            const room = findRoomByPlayerId(userId);
            let player;
            if (room) {
                player = findPlayerById(userId, room.players);
            }
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
function startGame(userId) {
    const room = findRoomByPlayerId(userId);
    if (room?.players.some(player => player.userId === userId && player.isHost === true)) {
        console.log("Accepted, starting game !");
    }
}
function findRoomByPlayerId(userId) {
    const room = lobbies.find(room => {
        return room.players.some(player => player.userId === userId);
    }) || null;
    return room;
}
function findPlayerById(playerId, playersList) {
    const player = playersList?.find((player) => player.getUserId === playerId);
    return player;
}
