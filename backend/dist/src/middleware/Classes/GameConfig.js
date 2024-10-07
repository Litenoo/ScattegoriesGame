"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameConfig = void 0;
class GameConfig {
    _settings;
    _characters;
    _categories;
    constructor(_settings, _characters, _categories) {
        this._settings = _settings;
        this._characters = _characters;
        this._categories = _categories;
    }
    get getCategories() {
        return this._categories;
    }
    get settings() {
        return this._settings;
    }
    setGameConfig(gameConfig) {
        try {
            console.log("received config : ", gameConfig);
            this._categories = gameConfig.categories;
            this._characters = gameConfig.characters;
            this._settings = gameConfig.settings;
            console.log("current gameConfig :", this);
        }
        catch (err) {
            console.log("Wrong game config structure.");
        }
    }
    getRandomLetter() {
        const index = Math.floor(Math.random() * this._characters.length);
        const letter = this._characters[index];
        this._characters.splice(index, 1);
        return letter;
    }
}
exports.GameConfig = GameConfig;
