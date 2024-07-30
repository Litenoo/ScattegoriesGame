<script setup>
import socket from '../socket'
import { ref, computed } from "vue";

function startGame() {

}

function refreshPlayers(){
    console.log("refresh playersList request sent");
    socket.emit("refreshPlayers", socket.id);
}

const players = ref([]);

socket.on("refreshPlayers", (playersList) => {
    console.log("refreshingPlayers", playersList);
    players.value = playersList;
});

refreshPlayers();

const hosts = computed(() => players.value.filter(player => player.isHost === true));
const nonHosts = computed(() => players.value.filter(player => player.isHost === false));

</script>

<template>
    <div class="flex justify-center items-center flex-col bg-zinc-800 shadow-xl rounded-lg pt-2 pb-2 pl-1 pr-1">
        <span class="pb-2">Lobby</span>
        <div class="flex flex-col">
            Players List :
            <div>

                <div v-for="host in hosts">
                    👑 {{ host.username }}
                </div>

                <div v-for="player in nonHosts">
                    - {{ player.username }}
                </div>

            </div>
            <button @click="startGame()">Start Game</button>
        </div>
    </div>
</template>