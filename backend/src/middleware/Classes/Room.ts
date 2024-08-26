import Player from "./Player";
import Settings from "./Settings";

export default class Room {
    private _players: Player[] = [];
    private _categories: string[] = [];
    private _settings: Settings | undefined;

    constructor(
        public readonly id: string,
        public readonly created: number,
        public readonly host: Player,
    ) {
        this._players.push(host);
    }

    public join(player: Player): void {
        this._players.push(player);
    }

    public set categories(categories: string[]) {
        this._categories = categories;
    }

    public set applySettings(settings: Settings) {
        this._settings = settings;
    }

    public get playerList(): Player[] {
        return this._players;
    }
}