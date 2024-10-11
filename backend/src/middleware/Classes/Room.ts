import Player from "./Player";
import { GameConfig, GameConfigInterface, Settings } from "./GameConfig";
import { AnswerStruct } from "@scattegoriesgame/shared/interfaces/voting";
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

    public async roundExecute() {
        console.log("round Execute called !");
        await this.provideCategoryPrompts();
        await this.collectAnswers();
        await this.provideVoting();
        await this.collectVotingChoices();
    }

    public async provideCategoryPrompts() {
        console.log("provideCategoriesPromts called");
        const categories = this.gameConfig.getCategories;
        const playtime = this.gameConfig.settings.playtime;
        const currentLetter = this.gameConfig.getRandomLetter();

        this.playerList.forEach((player) => {
            io.to(player.socketId).emit("provideCategoryPrompts", categories, playtime, currentLetter);
        });

        return new Promise<void>((resolve)=>{
            setTimeout(() => {
                resolve();
            }, this.gameConfig.settings.playtime * 1000);
        });
    }

    public async collectAnswers() {
        console.log("collectAnswersCalled")
        this.players.forEach((player) => {
            io.to(player.socketId).emit("collectAnswers");
        });

        this._socket?.on("answersResponse", (userId, answers) => {
            console.log("Received answer : ", userId, answers);
            const player = this.findPlayerById(userId);
            player?.pushAnswears(answers);
        });

        return new Promise<void>((resolve)=>{
            setTimeout(() => {
                resolve();
            }, 3000); // make it adjustable
        });
    }

    public async provideVoting() {
        //Gethering answers from users (they was set before)
        const answers: AnswerStruct[] = [];
        this.players.forEach((player) => {
            answers.push(player.answers);
        });

        //Sending answers to users
        const categories = this.gameConfig.getCategories;
        this.players.forEach((player) => {
            io.to(player.socketId).emit("providingVoting", categories, answers);
        });

        return new Promise<void>((resolve)=>{
            setTimeout(() => {
                resolve();
            }, this.gameConfig.settings.playtime); // add votingTime property or make it after everyone accepts or even both.
        });
    }

    public async collectVotingChoices() {
        this.players.forEach((player) => {
            io.to(player.socketId).emit("collectVotes");
        });

        this._socket?.on("votesResponse", (response)=>{

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