<script setup lang="ts">
import CategoryTile from './CategoryTile.vue';
import { useGameConfigStore } from '@/store/store';
import { ref } from "vue";

const store = useGameConfigStore();

const categories = ref(store.gameConfig?.getCategories);

</script>

<template>
    <div class="flex flex-wrap max-w-sm">
        <CategoryTile v-for="category in categories" :category="category" />
    </div>
</template>