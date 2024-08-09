import Player from "./Player";
import Settings from "./Settings";

class Room {
    private players: Player[] = [];
    private settings: Settings;

    constructor(settings: Settings) {
        this.settings = settings;
    }

    public setHost(host: Player): void {
        this.players.push(host);
    }

    public setPlayers(...players: Player[]): void {
        players.forEach(player => {
            players.push(player);
        });
    }

    public set setSettings(settings: Settings){
        this.settings = settings;
    }
}