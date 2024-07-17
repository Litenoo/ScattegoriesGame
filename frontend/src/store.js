import { defineStore } from "pinia";
import axios from 'axios';

export const userData = defineStore('userData', {
    state: () => {
        return { userId: "", roomId: "" };
    },
    actions: {
        getUserId: () => {

        },
        createRoom: () => {
            axios.post("http://localhost:3000/createRoom", {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:5173',
                    'Cookie': 'sameSite=strict',
                },
                withCredentials: true,
                sameSite: "strict",
            })
        }
    }
})