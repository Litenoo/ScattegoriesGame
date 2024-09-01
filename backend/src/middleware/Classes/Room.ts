import Player from "./Player";
import Settings from "./Settings";

export default class Room {
    private players: Player[] = [];
    private categories: string[] = [];
    private settings: Settings | undefined;

    constructor(
        public readonly id: string,
        public readonly created: number,
        public readonly host: Player,
    ) {
        this.players.push(host);
    }

    public join(player: Player): void {
        this.players.push(player);
    }

    public set setCategories(categories: string[]) {
        this.categories = categories;
    }

    public set applySettings(settings: Settings) {
        this.settings = settings;
    }

    public get playerList(): Player[] {
        return this.players;
    }

    public get roomMates(){
        const mates = this.players.map(player => ({username: player.username, isHost: player.isHost}));
        return mates;
    }
}