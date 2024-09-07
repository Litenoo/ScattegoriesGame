"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameConfig = void 0;
class GameConfig {
    settings;
    characters;
    categories;
    constructor(settings, characters, categories) {
        this.settings = settings;
        this.characters = characters;
        this.categories = categories;
    }
    get getSettings() {
        return {
            ...this
        };
    }
    get getCategories() {
        return this.categories;
    }
    setGameConfig(gameConfig) {
        console.log("settinGame config : ", gameConfig);
        this.categories = gameConfig.categories;
        this.characters = gameConfig.characters;
        this.settings = gameConfig.settings;
        console.log("this.categories:", this.categories);
    }
}
exports.GameConfig = GameConfig;
