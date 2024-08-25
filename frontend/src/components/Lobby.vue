<script setup>
import socket from '../socket'
import { ref, computed } from "vue";
import { useClipboard } from "@vueuse/core";

import Settings from "./Settings.vue";

function startGame() {
    const userId = localStorage.getItem("userId");
    console.log("StartGame with id : ", userId);
    socket.emit("startGame", userId);
}

function switchIdVisible() { showRoomId.value = !showRoomId.value }

function refreshPlayers() {
    console.log("refresh playersList request sent with userId = ", localStorage.getItem("userId"));
    socket.emit("refreshPlayers", localStorage.getItem("userId"));
}

const players = ref([]);
const roomId = ref(String);
const showRoomId = ref(false);

const { copy } = useClipboard({ roomId });

socket.on("refreshPlayers", (lobbyData) => {
    console.log("refreshPlayers data received : ", lobbyData.players);
    players.value = lobbyData.players;
    roomId.value = lobbyData.roomId;
});

refreshPlayers();

const hosts = computed(() => players.value.filter(player => player.isHost === true));
const nonHosts = computed(() => players.value.filter(player => player.isHost === false));

</script>

<template>
    <div class="flex items-center flex-row bg-zinc-800 shadow-xl rounded-lg p-2 min-w-12">
        <div>
            <span class="pb-2">Lobby</span>
            <div class="flex flex-col">
                <div class="flex flex-row rounded-lg bg-zinc-900 w-72">
                    <div class="flex flex-4 justify-center items-center flex-col cursor-pointer p-1 w-72"
                        @click="copy(roomId)">
                        <span v-if="showRoomId">{{ roomId }}</span>
                        <span v-else>Click here to copy room ID</span>
                    </div>
                    <div class="flex flex-1 justify-center items-center cursor-pointer p-1 bg-zinc-700 rounded-lg w-72 select-none"
                        @click="switchIdVisible()">
                        <span v-if="showRoomId">Hide</span>
                        <span v-else>Show</span>
                    </div>
                </div>

                Players List :
                <div>

                    <div v-for="host in hosts" class="p-0.5">
                        👑 {{ host.username }}
                    </div>

                    <div v-for="player in nonHosts" class="p-0.5">
                        - {{ player.username }}
                    </div>

                </div>
                <button @click="startGame()" class=" bg-zinc-900">Start Game</button>
            </div>
        </div>
        <Settings/>
    </div>
</template>