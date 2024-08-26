"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Settings {
    playtimeInSeconds;
    maxPlayerCount;
    characters;
    constructor(playtimeInSeconds, maxPlayerCount, characters) {
        this.playtimeInSeconds = playtimeInSeconds;
        this.maxPlayerCount = maxPlayerCount;
        this.characters = characters;
    }
    get getPlayTime() {
        return this.playtimeInSeconds;
    }
}
exports.default = Settings;
