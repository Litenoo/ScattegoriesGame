<script setup lang="ts">
import CategoryTile from './CategoryTile.vue';
import { useGameConfigStore } from '@/store/lobbyConfig';
import { ref } from "vue";

const gameConfig = useGameConfigStore();

const categories = ref(gameConfig.gameConfig?.categories);

</script>

<template>
    <div class="flex flex-wrap max-w-sm">
        <CategoryTile v-for="category in categories" :category="category" />
    </div>
</template>