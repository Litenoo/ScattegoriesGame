<script setup>
import { useGameConfigStore } from "../../store/store";

const store = useGameConfigStore();

function startGame() {
    store.startGame();
}
</script>

<template>
    <button @click="startGame()" class="bg-green-600 rounded-md min-w-24 p-3">
        Start
    </button>
</template>