<script setup lang="ts">
import { ref } from "vue";
import Brand from "@/components/general/Brand.vue";
import { useGameConfigStore } from "@/store/store";

const gameConfigStore = useGameConfigStore();

const roomId = ref();

function joinRoom() {
    gameConfigStore.joinRoom(roomId.value);
}
</script>

<template>
    <div class="flex justify-center flex-col items-center 
    bg-zinc-800 shadow-xl rounded-lg 
    pt-2 pb-2 pl-1 pr-1">
        <Brand />
        <span class="pb-2">Join By Id</span>
        <div class="flex flex-col">
            <input type="text" name="roomId" placeholder="room ID"  v-model="roomId">
            <button @click="joinRoom">Join</button>
        </div>
    </div>
</template> 