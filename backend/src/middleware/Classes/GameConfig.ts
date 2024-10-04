import Player from "./Player";

export interface Settings {
    readonly maxPlayerCount: number,
    readonly roundsQuantity: number,
    readonly playtime: number,
}

export interface GameConfigInterface {
    settings: Settings;
    characters: string[];
    categories: string[];
}

export class GameConfig {
    constructor(
        private _settings: Settings,
        private _characters: string[],
        private _categories: string[],
    ) {}

    public get getCategories(){
        return this._categories;
    }

    public get settings(){
        return this._settings;
    }

    public setGameConfig(gameConfig: GameConfigInterface){
        try{
            console.log("received config : ", gameConfig);
            this._categories = gameConfig.categories;
            this._characters = gameConfig.characters;
            this._settings = gameConfig.settings;
            console.log("current gameConfig :", this);
        }catch(err){
            console.log("Wrong game config structure.");
        }
    }

    public getRandomLetter(){
        const index = Math.floor(Math.random() * this._characters.length);
        const letter = this._characters[index];
        this._characters.splice(index, 1); // The delete is safe, because of its primitive values array.
        return letter;
    }
}