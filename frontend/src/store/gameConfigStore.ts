import { defineStore } from "pinia";
import socket from "../socket.js";

import Character from "../classes/Character.js";
import charactersJson from "./alphabet.json";
import router from "../router.js";

import GameConfig from "@/classes/GameConfig.js";
import UserConfig from "@/classes/UserConfig.js";
import Room from "@/classes/Room.js";
import { RefreshPlayersResponse } from "@/classes/serverResponses.js";

const charactersTemplate: string[] = charactersJson.alphabet;

function createDefultCharacters(): Character[] {
    return charactersTemplate.map(char => ({ character: char, state: true }));
}

export const useGameConfigStore = defineStore("gameConfig", {
    state: (): { userData: UserConfig | null, currentRoom: Room, gameConfig: GameConfig | null } => ({
        userData: null, // users data such as nickname, userID, isHost, socketId;
        currentRoom: new Room(), // room which user is currently in;
        gameConfig: null, // room settings & categories;
    }),
    actions: {
        async initUserData(username: string|undefined) { // Check if it may be done more efficient DEV
            const userConfig = new UserConfig();
            await userConfig.init(username);
            this.userData = userConfig;
        },
        async validateUserInit(next: Function) {
            if (this.userData?.getUsername ) {
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
                    console.log("RoomData :", roomData);
                    this.currentRoom.updateRoom(roomData);
                    router.push("/lobby");
                });
            });
        },
        async refreshPlayerList() {
            await this.validateUserInit(() => {
                socket.emit("refreshPlayers", this.userData?.getUserId);
            });
        },
        startGame() {
            const userId = localStorage.getItem("userId");
            if (userId) {
                socket.emit("startGame", userId, this.gameConfig);
            } else {
                console.log("Failed to read userId");
            }
        }
    }
});