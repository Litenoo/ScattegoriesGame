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
        refreshPlayers(userId);
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
        refreshPlayers(host.userId);
        return room.id;
    }
    catch (err) {
        logger_1.default.error("Unexpected Error : " + err);
    }
}
function startGame(userId, gameConfig) {
    const room = findRoomByPlayerId(userId);
    if (room?.playerList.some(player => player.userId === userId && player.isHost === true)) {
        room.beginGame(gameConfig);
        console.log("RECEIVED GAME CONF : ", gameConfig);
        const categories = room.gameConfig?.getCategories;
        console.log("sending game starting with categories : ", categories);
        room.playerList.forEach(player => {
            app_1.io.to(player.socketId).emit("gameStarted", { categories: categories });
        });
    }
    else {
        console.log("Denied, player who started the game is non host.");
    }
}
function refreshPlayers(userId) {
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
                    app_1.io.to(player.socketId).emit("refreshPlayers", { id: room.id, players: room.roomMates });
                });
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
