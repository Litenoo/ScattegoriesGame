<script setup>
import { gameConfig } from "../../store";
function startGame() {
    gameConfig.startGame();
}
</script>

<template>
    <button @click="startGame()" class="bg-green-600 rounded-md min-w-24 p-3">
        Start
    </button>
</template>