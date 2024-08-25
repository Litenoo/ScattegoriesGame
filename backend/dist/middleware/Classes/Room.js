"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Room {
    id;
    created;
    host;
    _players = [];
    _categories = [];
    _settings;
    constructor(id, created, host) {
        this.id = id;
        this.created = created;
        this.host = host;
        this._players.push(host);
    }
    join(player) {
        this._players.push(player);
    }
    set categories(categories) {
        this._categories = categories;
    }
    set applySettings(settings) {
        this._settings = settings;
    }
    get playerList() {
        return this._players;
    }
}
exports.default = Room;
