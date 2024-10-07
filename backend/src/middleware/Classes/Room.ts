import Player from "./Player";
import { GameConfig, GameConfigInterface, Settings } from "./GameConfig";
import { serverVotingResponse } from "shared/interfaces/voting";
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
        if (socket) {
            this.gameConfig?.setGameConfig(gameConfig);
            this._socket = socket;
            this.roundExecute();
        } else {
            console.log("no socket provided in beginGame");
        }
    }

    public roundExecute() {
        const currentLetter = this.gameConfig.getRandomLetter();

        this.playerList.forEach(player => {
            io.to(player.socketId).emit("newRound", this.gameConfig.getCategories, this.gameConfig.settings.playtime, currentLetter);
        });

        setTimeout(() => {
            this.collectAnswers();
        }, this.gameConfig.settings.playtime * 1000);
    }

    public collectAnswers() {
        this.players.forEach((player) => {
            io.to(player.socketId).emit("collectAnswers");
        });

        this._socket?.on("answersResponse", (userId, answears) => { //It may block execution !
            console.log("log -1")
            console.log("Received answear from someone wiuth user ID :", userId, answears); // ERROR I think it does not compile for some reason . Check dist folder. something messed up !
            const player = this.findPlayerById(userId);
            console.log("log0")
            player?.pushAnswears(answears);
        });
        
        console.log("log1 before set!");
        setTimeout(() => {
            console.log("voting timeout !");
            this.voting();
        }, 2000);
    }

    public voting() {
        console.log("VOTING !");
        let playersAnswers: serverVotingResponse[] = [];
        this.players.forEach((player) => {
            playersAnswers.push(player.answers);
        });

        this.playerList.forEach(player => {
            io.to(player.socketId).emit("votingRequest", this.gameConfig.getCategories, playersAnswers);
            console.log("Sended :", this.gameConfig.getCategories, " - ", playersAnswers);

            setTimeout(() => {
                this.players.forEach((player) => {
                    io.to(player.socketId).emit("collectVoting");
                });
                this._socket?.on("votingResponse", (userId, election) => {
                    const player = this.findPlayerById(userId);
                })
            }, 30000) //Make it modifiable as votingTime setting
        });
    }

    //methods used during the game
    roundIncrement() {
        this.currentRound++;
    }

    findPlayerById(userId: string) {
        return this.players.find(player => player.userId === userId);
    }
}