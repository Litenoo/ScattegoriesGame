import { defineStore } from "pinia";
import socket from "./socket.js";

const charactersTemplate = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z', 'Ć', 'Ł', 'Ś', 'Ź', 'Ż',
];

type Character = { // Move it to external file dev
    character: string,
    state: boolean,
}

const characters: Character[] = [];

charactersTemplate.forEach((char) => {
    characters.push({ character: char, state: true });
});

export const userData = defineStore('userData', {
    state: () => {
        return { userId: "", roomId: "" };
    },
    actions: {

    }
});

export const gameConfig = defineStore("gameConfig", {
    state: () => {
        return {
            settings: {
                maxPlayersQuantity: 10,
                playTimeInSeconds: 90,
                characters: characters,
            },
            categories: [
                "Country", "Capital City", "River"
            ]
        }
    },
    actions: {
        startGame() {
            socket.emit("startGame", localStorage.getItem("userId"), this.settings, this.categories);
        },
        modifyCharacter(char: string, boolean: boolean) { //dev
            const character = this.settings.characters.find(record => record.character === char);
            if (character) {
                character.state = boolean;
            }
        },
        removeCategory(categoryName: string) {
            const targetIndex = this.categories.forEach((element, index) => {
                if (element === categoryName) {
                    return targetIndex;
                }
            });
            console.log("Removing category with index : ", targetIndex);
        }
    }
});