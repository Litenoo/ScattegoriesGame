export default class Settings {
    private playTime: number; // in seconds
    private maxPlayerCount: number;

    constructor(playTime: number, maxPlayerCount:number){
        this.playTime = playTime;
        this.maxPlayerCount = maxPlayerCount;
    }

    public get getPlayTime(): number{
        return this.playTime;
    }
}