"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Settings {
    playTime;
    maxPlayerCount;
    constructor(playTime, maxPlayerCount) {
        this.playTime = playTime;
        this.maxPlayerCount = maxPlayerCount;
    }
    get getPlayTime() {
        return this.playTime;
    }
}
exports.default = Settings;
