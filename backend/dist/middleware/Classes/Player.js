"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    username;
    userId;
    socketId;
    isHost;
    score = 0;
    _answers = [];
    constructor(username, userId, socketId, isHost) {
        this.username = username;
        this.userId = userId;
        this.socketId = socketId;
        this.isHost = isHost;
    }
    scoreUp(value) {
        this.score = +value;
    }
    get answers() {
        return { username: this.username, answers: this._answers };
    }
    get getScore() {
        return this.score;
    }
    clearScore() {
        this.score = 0;
    }
    pushAnswears(...answears) {
        answears.map(answear => {
            this._answers.push({ answer: answear.answear, category: answear.category });
        });
    }
    clearAnswears() {
        this._answers = [];
    }
}
exports.default = Player;
