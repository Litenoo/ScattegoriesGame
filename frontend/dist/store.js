"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameConfig = exports.userData = void 0;
const pinia_1 = require("pinia");
const socket_js_1 = __importDefault(require("./socket.js"));
const charactersTemplate = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z', 'Ć', 'Ł', 'Ś', 'Ź', 'Ż',
];
const characters = [];
charactersTemplate.forEach((char) => {
    characters.push({ character: char, state: true });
});
exports.userData = (0, pinia_1.defineStore)('userData', {
    state: () => {
        return { userId: "", roomId: "" };
    },
    actions: {}
});
exports.gameConfig = (0, pinia_1.defineStore)("gameConfig", {
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
        };
    },
    actions: {
        startGame() {
            socket_js_1.default.emit("startGame", localStorage.getItem("userId"), categories, settings);
        },
        modifyCharacter(char, boolean) {
            const character = this.settings.characters.find(record => record.character === char);
            character.state = boolean;
        },
        removeCategory(categoryName) {
            const targetIndex = this.categories.forEach((element, index) => {
                if (element === categoryName) {
                    return targetIndex;
                }
            });
            console.log("Removing category with index : ", index);
        }
    }
});
