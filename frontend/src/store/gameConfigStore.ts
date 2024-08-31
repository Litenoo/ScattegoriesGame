import { defineStore } from "pinia";
import socket from "../socket.js";
import Character from "../classes/Character.js";
import charactersJson from "./alphabet.json";
import GameConfig from "@/classes/GameConfig.js";

const charactersTemplate: string[] = charactersJson.alphabet;

function createDefultCharacters(): Character[] {
    return charactersTemplate.map(char => ({ character: char, state: true }));
}

export default defineStore("gameConfig", {
    state: ():GameConfig => ({
        settings: {
            maxPlayersQuantity: 10,
            playTimeInSeconds: 90,
            characters: createDefultCharacters(),
        },
        categories: [
            "Country", "Capital City", "River",
        ],
        multiplayer: {
            playersNicknames: [],
        }
    }),
    actions: {
        startGame() {
            const userId = localStorage.getItem("userId");
            if (userId) {
                socket.emit("startGame", userId, this.settings, this.categories);
            } else {
                console.log("Failed to read userId");
            }
        },
        modifyCharacter(char: string, boolean: boolean) {
            const character = this.settings.characters.find(current => current.character === char);
            if (character) { character.state = boolean; }
        },
        removeCategory(categoryName: string) {
            const targetIndex = this.categories.findIndex(current => current === categoryName);
            console.log("Removing category with index : ", targetIndex, categoryName, this.categories[targetIndex], this.categories);
            if (targetIndex !== -1) { this.categories.splice(targetIndex, 1) }
        }
    }
});
