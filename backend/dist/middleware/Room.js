"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Room {
    players = [];
    settings;
    constructor(settings) {
        this.settings = settings;
    }
    setHost(host) {
        this.players.push(host);
    }
    setPlayers(...players) {
        players.forEach(player => {
            players.push(player);
        });
    }
    set setSettings(settings) {
        this.settings = settings;
    }
}
