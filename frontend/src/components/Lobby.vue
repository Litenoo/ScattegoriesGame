<script setup>
import socket from '../socket'
import { ref } from "vue";

function startGame() {

}
function createGame() {
    console.log("creating room");
    socket.emit("createRoom");
}

const players = ref();
createGame();

socket.on("refreshPlayers", (playersList) => {
    console.log("refreshingPlayers")
    players.value = playersList;
});
</script>

<template>
    <div class="flex justify-center items-center flex-col bg-zinc-800 shadow-xl rounded-lg pt-2 pb-2 pl-1 pr-1">
        <span class="pb-2">Lobby</span>
        <div class="flex flex-col">
            Players List :
            <div>
                <div v-for="player in players"> - {{ player.username }}</div>
            </div>
            <button @click="startGame()">Start Game</button>
        </div>
    </div>
</template>