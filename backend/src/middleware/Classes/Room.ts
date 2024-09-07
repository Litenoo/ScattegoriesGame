import Player from "./Player";
import { GameConfig, GameConfigStructure } from "./GameConfig";
import { io } from "../app";

export default class Room {
    private players: Player[] = [];
    readonly gameConfig: GameConfig | undefined;
    private currentRound: number = 0;

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

    public get playerList(): Player[] {
        return this.players;
    }

    public get roomMates() { // returns list of player without their socket id's and user id's.
        const mates = this.players.map(player => ({ username: player.username, isHost: player.isHost }));
        return mates;
    }


    beginGame(gameConfig: GameConfigStructure) {
        console.log("Updating gameConfi : ", gameConfig); // k
        this.gameConfig?.setGameConfig(gameConfig); // error here
        this.playerList.forEach(player => {
            io.to(player.socketId).emit("gameBegins", this.roomMates);
        });
    }

    //methods used during the game
    roundIncrement() {
        this.currentRound++;
    }
}