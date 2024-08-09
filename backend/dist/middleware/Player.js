"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    username;
    userId;
    socketId;
    isHost;
    constructor(username, userId, socketId, isHost) {
        this.username = username;
        this.userId = userId;
        this.socketId = socketId;
        this.isHost = isHost;
    }
    get getUsername() {
        return this.username;
    }
    get getUserId() {
        return this.userId;
    }
    get getSocketId() {
        return this.socketId;
    }
    get getIsHost() {
        return this.isHost;
    }
}
exports.default = Player;
