"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshPlayers = exports.userDisconnection = exports.createRoom = exports.joinRoom = void 0;
const logger_1 = __importDefault(require("./logger"));
const randomstring_1 = __importDefault(require("randomstring"));
const app_1 = require("./app");
const rooms = [];
function joinRoom(socket, userId, roomId, name, isHost) {
    try {
        const room = rooms.find(room => room.id === roomId);
        const user = { userId: userId, socketId: socket.id, username: name, isHost: isHost };
        if (room) {
            room.players.push(user);
            refreshPlayers(userId, socket.id);
        }
        else {
            socket.emit("Error", { errorMsg: "There is no room with id you search for" });
        }
    }
    catch (err) {
        logger_1.default.error("Unexpected Error : " + err);
    }
}
exports.joinRoom = joinRoom;
function createRoom() {
    try {
        const date = new Date();
        const roomId = randomstring_1.default.generate(12);
        const room = { id: roomId, players: [], created: date.getTime(), categories: [] };
        rooms.push(room);
        return room.id;
    }
    catch (err) {
        logger_1.default.error("Unexpected Error : " + err);
    }
}
exports.createRoom = createRoom;
function userDisconnection(socket) {
    try {
        console.log("Player Disconnected !");
    }
    catch (err) {
        logger_1.default.error(err);
    }
}
exports.userDisconnection = userDisconnection;
function refreshPlayers(userId, socketId) {
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
                    app_1.io.to(player.socketId).emit("refreshPlayers", { roomId: room.id, playerList: room.players });
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
