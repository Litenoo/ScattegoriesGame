<script lang="ts" setup>
import { useGameConfigStore } from "@/store/store";
import Input from "@/components/gameForm/AnswearInput.vue";
import { Answer } from "@/store/subClasses/RoomConfig";
import { ref } from "vue";
import socket from "@/socket";

const store = useGameConfigStore();
const categories = store.gameConfig.categories;

const answers: Answer[] = categories.map((category) => ({ category: category, answer: ref<string>("") }));

socket.on("collectAnswers", () => { 
    const userId = store.userData?.getUserId;
    answers.forEach(answer => {console.log(answer.answer.value)});
    const answerstoString = answers.map((answer)=>({category: answer.category, answer: answer.answer.value}));

    if(userId){
        console.log("Sending response : ", answerstoString);
        socket.emit("answersResponse", userId , answerstoString);
    }
});

</script>

<template>
    Time Roaming :
    <Input v-for="answer of answers" :answer="answer" />
</template>