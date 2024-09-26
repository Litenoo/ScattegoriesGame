import Player from "./Player";

export interface Settings {
    maxPlayerCount: number,
    roundsQuantity: number,
    playtime: number,
}

export interface GameConfigInterface {
    settings: Settings;
    characters: string[];
    categories: string[];
}

export class GameConfig {
    constructor(
        private settings: Settings,
        private characters: string[],
        private categories: string[],
    ) {}

    public get getSettings() {
        return { 
            ...this
        };
    }

    public get getCategories(){
        return this.categories;
    }

    public setGameConfig(gameConfig: GameConfigInterface){
        try{
            console.log("received config : ", gameConfig);
            this.categories = gameConfig.categories;
            this.characters = gameConfig.characters;
            this.settings = gameConfig.settings;
            console.log("current gameConfig :", this);
        }catch(err){
            console.log("Wrong game config structure.");
        }
    }
}