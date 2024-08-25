"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinRoom = joinRoom;
exports.createLobby = createLobby;
exports.startGame = startGame;
exports.refreshPlayers = refreshPlayers;
const logger_1 = __importDefault(require("./logger"));
const randomstring_1 = __importDefault(require("randomstring"));
const app_1 = require("./app");
const Room_1 = __importDefault(require("./Classes/Room"));
const Player_1 = __importDefault(require("./Classes/Player"));
const lobbies = [];
function joinRoom(socket, userId, roomId, name) {
    try {
        const room = lobbies.find(room => room.id === roomId);
        const player = new Player_1.default(name, userId, socket.id, false);
        if (room) {
            room.join(player);
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
function createLobby(socket, host) {
    try {
        const date = new Date();
        const lobbyId = randomstring_1.default.generate(12);
        const room = new Room_1.default(lobbyId, date.getTime(), host);
        lobbies.push(room);
        refreshPlayers(host.userId, socket.id);
        return room.id;
    }
    catch (err) {
        logger_1.default.error("Unexpected Error : " + err);
    }
}
function startGame(userId, categories, settings) {
    const room = findRoomByPlayerId(userId);
    if (room?.playerList.some(player => player.userId === userId && player.isHost === true)) {
        console.log("Accepted, starting game !");
    }
}
function refreshPlayers(userId, socketId) {
    try {
        console.log("Refreshing players list for userId : ", userId);
        if (userId) {
            const room = findRoomByPlayerId(userId);
            let player;
            if (room) {
                player = findPlayerById(userId, room.playerList);
            }
            if (room) {
                room.playerList.forEach((player) => {
                    if (player.socketId !== socketId) {
                        app_1.io.to(player.socketId).emit("refreshPlayers", { id: room.id, players: room.playerList });
                    }
                });
                app_1.io.to(socketId).emit("refreshPlayers", { id: room.id, players: room.playerList });
            }
        }
    }
    catch (err) {
        logger_1.default.error("Unexpected Error : ", err);
    }
}
function findRoomByPlayerId(userId) {
    const room = lobbies.find(room => {
        return room.playerList.some(player => player.userId === userId);
    }) || null;
    return room;
}
function findPlayerById(playerId, playersList) {
    const player = playersList?.find((player) => player.userId === playerId);
    return player;
}
