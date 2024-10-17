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
    pushAnswears(answers) {
        this._answers = [];
        console.log("Answers array :", answers);
        if (answers) {
            answers.forEach(answer => {
                this._answers.push(answer);
            });
        }
    }
    clearAnswears() {
        this._answers = [];
    }
}
exports.default = Player;
