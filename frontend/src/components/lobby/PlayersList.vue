<script setup lang="ts">
import socket from '../../socket.js';
import { ref, computed } from "vue";
import { useClipboard } from "@vueuse/core";
import StartButton from './StartButton.vue';
import { useGameConfigStore } from '@/store/gameConfigStore.js';

const store = useGameConfigStore(); // neessary to make store work correctly.

const roomId = computed(() => store.currentRoom.id || "null");

const { copy } = useClipboard({ source: roomId });

function switchIdVisible() { showRoomId.value = !showRoomId.value }

const showRoomId = ref(false);

const hosts = computed(() => store.currentRoom?.roomMates.filter(player => player.isHost === true));
const nonHosts = computed(() => store.currentRoom?.roomMates.filter(player => player.isHost === false));

</script>

<template>
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
            <StartButton />
        </div>
    </div>
</template>