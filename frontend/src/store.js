import { defineStore } from "pinia";
import socket from "./socket.js";

const charactersTemplate = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z', 'Ć', 'Ł', 'Ś', 'Ź', 'Ż',
];

const characters = [];

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
            socket.emit("startGame", localStorage.getItem("userId"), categories, settings);
        },
        modifyCharacter(char, boolean) {
            const character = this.settings.characters.find(record => record.character === char);
            character.state = boolean;
        },
        removeCategory(categoryName) {
            const targetIndex = this.categories.forEach((element, index) => {
                if(element === categoryName){
                    return targetIndex;
                }
            });
            console.log("Removing category with index : ", index);
        }
    }
});