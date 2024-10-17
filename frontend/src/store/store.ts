import { defineStore } from "pinia";

import router from "../router.js";
import socket from "../socket.js";

import { RefreshPlayersResponse } from "@/classes/serverResponses.js";
import { AnswerStruct, Answer } from "@scattegoriesgame/shared/interfaces/voting";
import GameConfig from "@/store/subClasses/GameConfig.js";
import UserConfig from "@/store/subClasses/UserConfig.js";
import Room from "@/store/subClasses/RoomConfig.js";
import gameConfigInterface from "@/store/subClasses/GameConfigInt.js";

export const useGameConfigStore = defineStore("gameConfig", {
    state: (): { userData: UserConfig | null, currentRoom: Room, gameConfig: GameConfig } => ({
        userData: null, // users data such as nickname, userID, isHost, socketId;
        currentRoom: new Room(), // room which user is currently in;
        gameConfig: new GameConfig(), // room settings & categories;
    }),
    persist: true,
    actions: {
        async initUserData(username: string | undefined) { // Check if it may be done more efficient DEV
            const userConfig = new UserConfig();
            await userConfig.init(username);
            this.userData = userConfig;
        },
        async validateUserInit(next: Function) {
            if (this.userData?.getUsername) {
                if (next) { next() };
            } else {
                await this.initUserData(this.userData?.getUsername);
                next();
            };
        },
        async joinRoom(roomId: string) {
            await this.validateUserInit(() => {
                const userId = this.userData?.getUserId;
                const username = this.userData?.getUsername;
                if (userId) {
                    socket.emit("joinRoom", userId, roomId, username);
                    socket.on("refreshPlayers", (roomData: RefreshPlayersResponse) => {
                        this.currentRoom.updateRoom(roomData);
                        router.push("/lobby");
                    });
                } else {
                    console.log("JoinRoom operation has failed");
                }
            });
        },
        async createRoom() {
            await this.validateUserInit(() => {
                const userId = this.userData?.getUserId;
                const username = this.userData?.getUsername;
                socket.emit("createRoom", userId, username);
                socket.on("refreshPlayers", (roomData: RefreshPlayersResponse) => {
                    this.currentRoom.updateRoom(roomData);
                    router.push("/lobby");
                });
            });
        },
        async refreshPlayerList() {
            await this.validateUserInit(() => {
                socket.emit("refreshPlayers", this.userData?.getUserId);
                socket.on("refreshPlayers", (roomData: RefreshPlayersResponse) => {
                    this.currentRoom.updateRoom(roomData);
                });
            });
        },
        async startGame() {
            await this.validateUserInit(() => {
                const gameConf: gameConfigInterface = this.gameConfig.getConfig;
                console.log("Sending config : ", gameConf);
                socket.emit("startGame", this.userData?.getUserId, gameConf);
            });
        },
        async initAnswears() {
            await this.validateUserInit(() => {
                this.currentRoom.setupAnswears(this.gameConfig.categories);
            });
        }
    },
});

const store = useGameConfigStore();

socket.on("provideCategoryPrompts", async (categories: string[], playTime: number, letter: string) => {
    console.log("provideCategoryPrompts :", categories, playTime, letter);
    store.gameConfig.setCategories = categories;
    store.gameConfig.settings.playTimeInSeconds = playTime;
    store.gameConfig.currentLetter = letter;

    await store.initAnswears();
    router.push("/form");
});

socket.on("provideVoting", (categories: string[], playersAnswers: string[]) => { // categories, {username, answers} //DEV think if categories are needed
    store.currentRoom.updateVotingLabel = playersAnswers;
    console.log("PLAYER ANSWERS :", playersAnswers);
    router.push("voting");
});

socket.on("collectVotes", () => {
    const userId = store.userData?.getUserId;

    const answers: Answer[] = store.currentRoom.votingLabel.map((answer, index) => ({
        category: store.gameConfig.categories[index],
        answer: answer,
    }));

    const response: AnswerStruct = { username: String(store.userData?.getUsername), answers: answers }

    console.log("Response sending : ", response);

    if (userId) {
        console.log("Sending response : ", response);
        socket.emit("answersResponse", userId, response);
    }
});