export default class Settings {

    constructor(
        private playtimeInSeconds:number,
        private maxPlayerCount: number,
        private characters: string[],
    ) {}

    public get getPlayTime(): number {
        return this.playtimeInSeconds;
    }
}