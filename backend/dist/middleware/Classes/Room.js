"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
class Room {
    id;
    created;
    host;
    players = [];
    gameConfig;
    currentRound = 0;
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
    beginGame(gameConfig) {
        console.log("Updating gameConfi : ", gameConfig);
        this.gameConfig?.setGameConfig(gameConfig);
        this.playerList.forEach(player => {
            app_1.io.to(player.socketId).emit("gameBegins", this.roomMates);
        });
    }
    roundIncrement() {
        this.currentRound++;
    }
}
exports.default = Room;
