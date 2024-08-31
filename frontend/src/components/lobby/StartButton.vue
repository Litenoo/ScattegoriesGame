<script setup>
import { useGameConfigStore } from "../../store/gameConfigStore";

const gameConfig = useGameConfigStore();

function startGame() {
    gameConfig.startGame();
}
</script>

<template>
    <button @click="startGame()" class="bg-green-600 rounded-md min-w-24 p-3">
        Start
    </button>
    <!-- Move this component to another folder. -->
</template>