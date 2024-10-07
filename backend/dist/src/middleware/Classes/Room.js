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
    roundExecute() {
        const currentLetter = this.gameConfig.getRandomLetter();
        this.playerList.forEach(player => {
            app_1.io.to(player.socketId).emit("newRound", this.gameConfig.getCategories, this.gameConfig.settings.playtime, currentLetter);
        });
        setTimeout(() => {
            this.collectAnswers();
        }, this.gameConfig.settings.playtime * 1000);
    }
    collectAnswers() {
        this.players.forEach((player) => {
            app_1.io.to(player.socketId).emit("collectAnswers");
        });
        this._socket?.on("answersResponse", (userId, answears) => {
            console.log("log -1");
            console.log("Received answear from someone wiuth user ID :", userId, answears);
            const player = this.findPlayerById(userId);
            console.log("log0");
            player?.pushAnswears(answears);
        });
        console.log("log1 before set!");
        setTimeout(() => {
            console.log("voting timeout !");
            this.voting();
        }, 2000);
    }
    voting() {
        console.log("VOTING !");
        let playersAnswers = [];
        this.players.forEach((player) => {
            playersAnswers.push(player.answers);
        });
        this.playerList.forEach(player => {
            app_1.io.to(player.socketId).emit("votingRequest", this.gameConfig.getCategories, playersAnswers);
            console.log("Sended :", this.gameConfig.getCategories, " - ", playersAnswers);
            setTimeout(() => {
                this.players.forEach((player) => {
                    app_1.io.to(player.socketId).emit("collectVoting");
                });
                this._socket?.on("votingResponse", (userId, election) => {
                    const player = this.findPlayerById(userId);
                });
            }, 30000);
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
