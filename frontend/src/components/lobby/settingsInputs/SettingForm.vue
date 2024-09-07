<script setup lang="ts">
import { useGameConfigStore } from "@/store/lobbyConfig";
import TextInput from "./TextInput.vue";

const store = useGameConfigStore();
const settings = store.gameConfig.settings;

function setMaxPlayerQuantity(value: number) {
    settings.maxPlayersQuantity = value;
}
function setPlayTimeInSeconds(value: number) {
    settings.playTimeInSeconds = value;
}
function setRoundsQuantity(value: number) {
    settings.roundsQuantity = value;
}


</script>

<template>
    <TextInput :callback="setMaxPlayerQuantity" description="Players max quantity" :defaultValue=10 />
    <TextInput :callback="setPlayTimeInSeconds" description="Playtime" :defaultValue=90 />
    <TextInput :callback="setRoundsQuantity" description="Rounds Quantity" :defaultValue=10 />
</template>