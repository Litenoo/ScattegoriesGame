import {defineStore} from "pinia";
import axios from "axios";

import socket from "../socket.js";

import Player from "../classes/Player.js";

export default defineStore("userData", {
    state: async (): Promise<Player> => ({
        username: null,
        userId: await getUserId(),
        isHost: false,
        socketId: socket.id,
    }),
    actions: () => {

    }
});

async function getUserId(): Promise<string|undefined> {
    const userId = localStorage.getItem("userId");
    if (userId) {
        return userId;
    }
    try {
        const response = await axios.get<string>("http://localhost:3000/userId"); // think about puting link in .env file
        const newUserId = response.data;
        localStorage.setItem("userId", newUserId);
        return newUserId;
    } catch (err) {
        console.log(err);
    }
    return undefined;
}