<script setup>
import Brand from "./Brand.vue";
import socket from "../socket";
</script>

<template>
        <div class="flex justify-center items-center flex-col bg-zinc-800 shadow-xl rounded-lg pt-2 pb-2 pl-1 pr-1">
            <Brand />
            <div class="flex flex-row">
                <router-link  to="/create" class="flex items-center align-middle justify-center w-button rounded-md bg-neutral-900 h-12 m-1 pb-1">
                    Create New Room
                </router-link>
                <router-link to="/join" class="flex items-center justify-center w-button rounded-md bg-neutral-900 h-12 m-1 pb-1">
                    Join Room
                </router-link>
            </div>
        </div>
</template>