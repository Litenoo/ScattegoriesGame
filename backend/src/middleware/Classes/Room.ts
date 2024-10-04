import Player from "./Player";
import { GameConfig, GameConfigInterface, Settings } from "./GameConfig";
import { io } from "../app";
import { Socket } from "socket.io";

export default class Room {
    private players: Player[] = [];
    readonly gameConfig: GameConfig = new GameConfig({ maxPlayerCount: 10, playtime: 10, roundsQuantity: 10 }, [], []);
    private currentRound: number = 0;
    private _socket: Socket | undefined;

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

    public beginGame(gameConfig: GameConfigInterface, socket: Socket) {
        console.log("Updating gameConfig : ", gameConfig);
        if (socket) {
            this.gameConfig?.setGameConfig(gameConfig);
            this._socket = socket;
            this.roundStarts();
        } else {
            console.log("no socket provided in beginGame");
        }
    }

    public roundStarts() {
        console.log("Round starts !, timeout :", this.gameConfig.settings.playtime * 1000);
        const currentLetter = this.gameConfig.getRandomLetter();
        this.playerList.forEach(player => {
            io.to(player.socketId).emit("newRound", this.gameConfig.getCategories, this.gameConfig.settings.playtime, currentLetter);
        });

        setTimeout(() => {
            this.players.forEach((player) => {
                io.to(player.socketId).emit("collectAnswers");
                console.log("Sended Answears request");
            });

            this._socket?.on("answersResponse", (userId, answears) => { //think about moving it externaly
                console.log("Received answear from user :", userId, answears);
                const player = this.players.find((player) => {player.userId === userId});
                player?.pushAnswears(answears);
            });

            setTimeout(() => {
                this.roundIncrement();
                if (this.currentRound < this.gameConfig.settings.roundsQuantity) {
                    this.roundStarts();
                }
                return;
            }, 2000) //dev make it settable within settings
        },
            this.gameConfig.settings.playtime * 1000);
    }

    public voting() {
        this.playerList.forEach(player => {
            const playersAnswears = [];
            io.to(player.socketId).emit("voting", this.gameConfig.getCategories, playersAnswears);
        });
    }

    //methods used during the game
    roundIncrement() {
        this.currentRound++;
    }
}