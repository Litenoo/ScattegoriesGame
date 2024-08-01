<script setup>
import socket from '../socket'
import { ref, computed } from "vue";
import { useClipboard } from "@vueuse/core"

function startGame() {

}

function refreshPlayers() {
    console.log("refresh playersList request sent");
    socket.emit("refreshPlayers", socket.id);
}

function switchIdVisible(){ showRoomId.value = !showRoomId.value }

const players = ref([]);
const roomId = ref(String);
const showRoomId = ref(false);

const { copy } = useClipboard({ roomId })

socket.on("refreshPlayers", (lobbyData) => {
    console.log("refreshingPlayers", lobbyData.playerList);
    players.value = lobbyData.playerList;
    roomId.value = lobbyData.roomId;
});

refreshPlayers();

const hosts = computed(() => players.value.filter(player => player.isHost === true));
const nonHosts = computed(() => players.value.filter(player => player.isHost === false));

</script>

<template>
    <div
        class="flex justify-center items-center flex-col bg-zinc-800 shadow-xl rounded-lg pt-2 pb-2 pl-2 pr-2 min-w-12 w-80">
        <span class="pb-2">Lobby</span>
        <div class="flex flex-col">
            <div class="flex flex-row rounded-lg bg-zinc-900 w-72">
                <div
                    class="flex flex-4 justify-center items-center flex-col cursor-pointer p-1 w-72" @click="copy(roomId)">
                    <span v-if="showRoomId">{{ roomId }}</span>
                    <span v-else>Click here to copy room ID</span>
                </div>
                <div class="flex flex-1 justify-center items-center cursor-pointer p-1 bg-zinc-700 rounded-lg w-72 select-none" @click="switchIdVisible()">
                    <span v-if="showRoomId">Hide</span>
                    <span v-else>Show</span>
                </div>
            </div>


            Players List :
            <div>

                <div v-for="host in hosts">
                    👑 {{ host.username }}
                </div>

                <div v-for="player in nonHosts">
                    - {{ player.username }}
                </div>

            </div>
            <button @click="startGame()" class=" bg-zinc-900">Start Game</button>
        </div>
    </div>
</template>