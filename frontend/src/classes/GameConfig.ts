import characterSet from "../store/alphabet.json";
import socket from "@/socket";
import { useGameConfigStore } from "@/store/gameConfigStore";

const store = useGameConfigStore();

class Settings {
    constructor(
        public maxPlayersQuantity: number,
        public playTimeInSeconds: number,
        public characters: string[],
    ) { }
}

export default class defaultConfig {
    readonly settings = new Settings(10, 90, characterSet.alphabet);
    public categories: string[] = ["City", "Country", "River"];

    createGame() {
        const username = localStorage.getItem("username");
        const userId = store.userData?.getUserId;
        socket.emit("createRoom", userId, username);
    }
}