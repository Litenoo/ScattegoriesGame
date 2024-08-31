<script setup lang="ts">
import CategoryTile from './CategoryTile.vue';
import useGameConfigStore from '../../../store/gameConfigStore';
import { ref } from "vue";

const gameConfig = useGameConfigStore();

const categories = ref(gameConfig.categories);

</script>

<template>
    <div class="flex flex-wrap">
        <CategoryTile v-for="category in categories"  :category="category"/>
    </div>
</template>