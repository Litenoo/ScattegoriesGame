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
        console.log("Updating gameConfig : ", gameConfig);
        if (socket) {
            this.gameConfig?.setGameConfig(gameConfig);
            this._socket = socket;
            this.roundStarts();
        }
        else {
            console.log("no socket provided in beginGame");
        }
    }
    roundStarts() {
        console.log("Round starts !, timeout :", this.gameConfig.settings.playtime * 1000);
        const currentLetter = this.gameConfig.getRandomLetter();
        this.playerList.forEach(player => {
            app_1.io.to(player.socketId).emit("newRound", this.gameConfig.getCategories, this.gameConfig.settings.playtime, currentLetter);
        });
        setTimeout(() => {
            this.players.forEach((player) => {
                app_1.io.to(player.socketId).emit("collectAnswers");
                console.log("Sended Answears request");
            });
            this._socket?.on("answersResponse", (userId, answears) => {
                console.log("Received answear from user :", userId, answears);
                const player = this.players.find((player) => { player.userId === userId; });
                player?.pushAnswears(answears);
            });
            setTimeout(() => {
                this.roundIncrement();
                if (this.currentRound < this.gameConfig.settings.roundsQuantity) {
                    this.roundStarts();
                }
                return;
            }, 2000);
        }, this.gameConfig.settings.playtime * 1000);
    }
    voting() {
        this.playerList.forEach(player => {
            const playersAnswears = [];
            app_1.io.to(player.socketId).emit("voting", this.gameConfig.getCategories, playersAnswears);
        });
    }
    roundIncrement() {
        this.currentRound++;
    }
}
exports.default = Room;
