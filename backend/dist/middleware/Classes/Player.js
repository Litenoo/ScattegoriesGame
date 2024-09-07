"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    username;
    userId;
    socketId;
    isHost;
    score = 0;
    answears = [];
    constructor(username, userId, socketId, isHost) {
        this.username = username;
        this.userId = userId;
        this.socketId = socketId;
        this.isHost = isHost;
    }
    scoreUp(value) {
        this.score = +value;
    }
    get getScore() {
        return this.score;
    }
    clearScore() {
        this.score = 0;
    }
    pushAnswears(...answears) {
        answears.map(answear => {
            this.answears.push({ value: answear, rate: 0 });
        });
    }
    clearAnswears() {
        this.answears = [];
    }
}
exports.default = Player;
