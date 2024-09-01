"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Room {
    id;
    created;
    host;
    players = [];
    categories = [];
    settings;
    constructor(id, created, host) {
        this.id = id;
        this.created = created;
        this.host = host;
        this.players.push(host);
    }
    join(player) {
        this.players.push(player);
    }
    set setCategories(categories) {
        this.categories = categories;
    }
    set applySettings(settings) {
        this.settings = settings;
    }
    get playerList() {
        return this.players;
    }
    get roomMates() {
        const mates = this.players.map(player => ({ username: player.username, isHost: player.isHost }));
        return mates;
    }
}
exports.default = Room;
