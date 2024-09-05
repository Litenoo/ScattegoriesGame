<script setup lang="ts">
import { ref } from "vue";
import router from "../router.js";

import { useGameConfigStore } from "../store/lobbyConfig.js";
import Brand from "./Brand.vue";

const gameConfig = useGameConfigStore();

const username = ref();

function joinByCodeRedirect(){
    gameConfig.initUserData(username.value);
    router.push("/join");
}

async function createGame(){
    await gameConfig.initUserData(username.value);
    gameConfig.createRoom();
    router.push("/lobby");
}
</script>

<template>
    <div class="flex justify-center flex-col items-center
        bg-zinc-800 shadow-xl rounded-lg
        pt-2 pb-2 pl-1 pr-1">
        <Brand />
        <input type="text" name="username" placeholder="Username"
            class="mb-5 w-2/3 bg-neutral-900 border border-1 border-zinc-400 rounded-md p-2 outline-none"
            v-model="username">
        <div class="flex flex-row">
            <div class="flex items-center align-middle justify-center w-button rounded-md bg-neutral-900 h-12 m-1 pb-1 cursor-pointer"
                @click="createGame">
                Create New Room
            </div>
            <div class="flex items-center justify-center w-button rounded-md bg-neutral-900 h-12 m-1 pb-1 cursor-pointer"
                @click="joinByCodeRedirect">
                Join Room
            </div>
        </div>
    </div>
  </template>