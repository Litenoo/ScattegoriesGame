<script lang="ts" setup>
import { useGameConfigStore } from "@/store/store";
import Input from "@/components/gameForm/AnswearInput.vue";
import { AnswerStruct, Answer } from "@scattegoriesgame/shared/interfaces/voting";
import { ref } from "vue";
import socket from "@/socket";

const store = useGameConfigStore();
const categories = store.gameConfig.categories;

const answers = categories.map((category) => ({ category: category, answer: ref<string>("") }));

socket.on("collectAnswers", () => {
    const userId = store.userData?.getUserId;
    const answersToString: Answer[] = answers.map((answer) => (
        {
            category: answer.category,
            answer: answer.answer.value, //standarize to AnswerStruct
        }
    ));

    const username = store.userData?.getUsername;
    let response: AnswerStruct | undefined;

    if (username) {
        response = {
            username: username,
            answers: answersToString,
        }
    }

    if (userId) {
        console.log("Sending response : ", response);
        socket.emit("answersResponse", userId, response);
    }
});

</script>

<template>
    Time Roaming :
    <Input v-for="answer of answers" :answer="answer" />
</template>