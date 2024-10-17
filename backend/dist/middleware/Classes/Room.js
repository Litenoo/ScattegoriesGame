"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameConfig_1 = require("./GameConfig");
const app_1 = require("../app");
class Room {
    id;
    created;
    host;
    players = [];
    gameConfig = new GameConfig_1.GameConfig({ maxPlayerCount: 10, playtime: 10, roundsQuantity: 10 }, [], []);
    currentRound = 0;
    _socket;
    constructor(id, created, host) {
        this.id = id;
        this.created = created;
        this.host = host;
        this.players.push(host);
    }
    join(player) {
        this.players.push(player);
    }
    get playerList() {
        return this.players;
    }
    get roomMates() {
        const mates = this.players.map(player => ({ username: player.username, isHost: player.isHost }));
        return mates;
    }
    beginGame(gameConfig, socket) {
        if (socket) {
            this.gameConfig?.setGameConfig(gameConfig);
            this._socket = socket;
            this.roundExecute();
        }
        else {
            console.log("no socket provided in beginGame");
        }
    }
    async roundExecute() {
        console.log("round Execute called !");
        await this.provideCategoryPrompts();
        await this.collectAnswers();
        await this.provideVoting();
        await this.collectVotingChoices();
    }
    async provideCategoryPrompts() {
        console.log("provideCategoriesPromts called");
        const categories = this.gameConfig.getCategories;
        const playtime = this.gameConfig.settings.playtime;
        const currentLetter = this.gameConfig.getRandomLetter();
        this.playerList.forEach((player) => {
            app_1.io.to(player.socketId).emit("provideCategoryPrompts", categories, playtime, currentLetter);
        });
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, this.gameConfig.settings.playtime * 1000);
        });
    }
    async collectAnswers() {
        console.log("collectAnswersCalled");
        this.players.forEach((player) => {
            app_1.io.to(player.socketId).emit("collectAnswers");
        });
        this._socket?.on("answersResponse", (userId, response) => {
            console.log("Received answer : ", userId, response);
            const player = this.findPlayerById(userId);
            player?.pushAnswears(response.answers);
        });
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 3000);
        });
    }
    async provideVoting() {
        const answers = [];
        this.players.forEach((player) => {
            answers.push(player.answers);
        });
        const categories = this.gameConfig.getCategories;
        this.players.forEach((player) => {
            app_1.io.to(player.socketId).emit("provideVoting", categories, answers);
        });
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, this.gameConfig.settings.playtime);
        });
    }
    async collectVotingChoices() {
        this.players.forEach((player) => {
            app_1.io.to(player.socketId).emit("collectVotes");
        });
        this._socket?.on("votesResponse", (response) => {
        });
    }
    roundIncrement() {
        this.currentRound++;
    }
    findPlayerById(userId) {
        return this.players.find(player => player.userId === userId);
    }
}
exports.default = Room;
