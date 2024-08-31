export default class gameConfig{
    readonly settings: Settings;

    constructor(settings: Settings){
        this.settings = settings;
    }
}

interface Settings {
    maxPlayersQuantity: number,
    playTimeInSeconds: number,
    characters: string[],
}