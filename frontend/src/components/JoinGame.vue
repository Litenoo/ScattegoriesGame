<script setup>
import { defineModel } from 'vue';
import Brand from "./Brand.vue";
import socket from "../socket";
import router from "../router";
const roomId = defineModel();

function joinRoom() {
    socket.emit("joinRoom", roomId.value)
    router.push({path : "create"});
}
</script>

<template>
    <div class="flex justify-center flex-col items-center 
    bg-zinc-800 shadow-xl rounded-lg 
    pt-2 pb-2 pl-1 pr-1">
        
        <Brand />

        <span class="pb-2">Join By Id</span>

        <div class="flex flex-col">
            <input type="text" name="roomId" v-model="roomId">
            <button @click="joinRoom()">Join</button>
        </div>
    </div>
</template>