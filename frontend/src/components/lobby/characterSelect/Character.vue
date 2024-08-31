<script setup>
import { ref } from "vue";
import { useGameConfigStore } from "../../../store/gameConfigStore";
const props = defineProps({ char: String });

const gameConfig = useGameConfigStore();

let checkboxStatus = ref(true);

function switchStatus() {
    checkboxStatus.value = !checkboxStatus.value;
    gameConfig.modifyCharacter(props.char, checkboxStatus.value);
}
</script>

<template>
    <div @click="switchStatus()" class="bg-gray-700 border p-1 m-1 font-mono rounded-sm select-none cursor-pointer"
        :class="{ 'bg-neutral-200 text-zinc-800': checkboxStatus, 'bg-zinc-800 border-zinc-50 text-neutral-300': !checkboxStatus }">
        {{ props.char }}
    </div>
</template>