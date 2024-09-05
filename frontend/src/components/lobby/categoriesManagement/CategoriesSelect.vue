<script setup lang="ts">
import { computed } from 'vue';
import { useGameConfigStore } from '@/store/lobbyConfig';
import CategoryTile from './CategoryTile.vue';
import submitButton from './submitButton.vue';

const store = useGameConfigStore();
const categories = computed(() => { return store.gameConfig?.categories })

const customCategory = defineModel<string>("category");

function commitCustomCategory() {
    if (customCategory.value) {
        store.gameConfig!.pushCategory(customCategory.value);
    }
}

function removeCategory(category: string) {
    store.gameConfig?.removeCategory(category);
}

</script>

<template>
    <div class="flex p-1 max-h-8">
        <input type="text" placeholder="cattegory" class="m-0 p-0.5 rounded-md" v-model="customCategory">
        <submitButton :callback="commitCustomCategory" />
    </div>

</template>