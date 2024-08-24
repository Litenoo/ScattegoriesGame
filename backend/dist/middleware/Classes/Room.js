"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Room {
    id;
    created;
    players = [];
    constructor(id, created) {
        this.id = id;
        this.created = created;
    }
    setHost(host) {
        this.players.push(host);
    }
    setPlayers(...players) {
        players.forEach(player => {
            players.push(player);
        });
    }
}
exports.default = Room;
