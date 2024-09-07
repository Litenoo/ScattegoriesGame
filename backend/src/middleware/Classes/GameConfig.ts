export interface Settings {
    maxPlayersQuantity: number,
    playTimeInSeconds: number,
    roundsQuantity: number,
}

export interface GameConfigStructure {
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

    public setGameConfig(gameConfig: GameConfigStructure){
        console.log("settinGame config : ", gameConfig);
        this.categories = gameConfig.categories;
        this.characters = gameConfig.characters;
        this.settings = gameConfig.settings;
        console.log("this.categories:", this.categories);
    }
}