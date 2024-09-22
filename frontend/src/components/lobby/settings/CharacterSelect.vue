<script setup>
import Character from './Character.vue';

const characters = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z', 'Ć', 'Ł', 'Ś', 'Ź', 'Ż',
];
</script>

<template>
    <div class="grid grid-flow-row grid-cols-12">
        <Character v-for="character of characters" :char="character" />
    </div>
</template>