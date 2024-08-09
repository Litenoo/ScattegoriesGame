import { defineStore } from "pinia";
import axios from 'axios';

export const userData = defineStore('userData', {
    state: () => {
        return { userId: "", roomId: "" };
    },
    actions: {
    }
})