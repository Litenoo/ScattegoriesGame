import { create } from "domain";
import Player from "./Player";
import Settings from "./Settings";

export default class Room {
    readonly id: string;
    protected created: number;
    readonly players: Player[] = [];
    // readonly categories: string[];
    // private settings: Settings;

    constructor(id: string, created: number) {
        this.id = id;
        this.created = created; //number of seconds till 1 January 1970. Will be used later to delete old rooms.
    }

    public setHost(host: Player): void {
        this.players.push(host);
    }

    public setPlayers(...players: Player[]): void {
        players.forEach(player => {
            players.push(player);
        });
    }

    // public set setSettings(settings: Settings){
    //     this.settings = settings;
    // }
}