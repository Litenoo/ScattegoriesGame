<script setup lang="ts">
import useGameConfigStore from '../../../store/gameConfigStore';

const props = defineProps({ category: String });
const gameConfig = useGameConfigStore();

function selfDelete() { if (props.category) gameConfig.removeCategory(props.category); }
</script>

<template>
    <div class=" bg-neutral-800 border border-neutral-200 p-1 m-0.5 rounded-md cursor-pointer" @click="selfDelete()">
        {{ props.category }}
    </div>
</template>