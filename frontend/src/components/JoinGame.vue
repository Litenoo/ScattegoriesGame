<script setup>
import { defineModel } from 'vue';
import Brand from "./Brand.vue";
const roomId = defineModel();

function joinRoom() {
    console.log(roomId.value);
}
</script>

<template>
    <div class="flex justify-center items-center flex-col bg-zinc-800 shadow-xl rounded-lg pt-2 pb-2 pl-1 pr-1">
        <Brand />
        <span class="pb-2">Join By Id</span>
        <div class="flex flex-col">
            <input type="text" name="roomId" v-model="roomId">
            <button @click="joinRoom()">Join</button>
        </div>
    </div>
</template>