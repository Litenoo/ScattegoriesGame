<script lang="ts" setup>
import { useGameConfigStore } from "@/store/store";
import Input from "@/components/gameForm/AnswearInput.vue";
import { Answear } from "@/store/subClasses/RoomConfig";
import { ref } from "vue";
import socket from "@/socket";

const store = useGameConfigStore();
const categories = store.gameConfig.categories;

const answears: Answear[] = categories.map((category) => ({ category: category, answear: ref<string>("") }));

socket.on("collectAnswears", () => {
    const userId = store.userData?.getUserId
    const answearsToString = answears.map((answear)=>({category: answear.category, answear: answear.answear.value}))
    if(userId){
        socket.emit("answearsResponse", userId , answearsToString);
    }
});

</script>

<template>
    Time Roaming :
    <Input v-for="answear of store.currentRoom.answears" :answear="answear" />
</template>