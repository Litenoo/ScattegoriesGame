<script setup lang="ts">
import { useGameConfigStore } from '@/store/store';
import submitButton from './SubmitButton.vue';

const store = useGameConfigStore();
const customCategory = defineModel<string>("category");

function commitCustomCategory() {
    if (customCategory.value) {
        store.gameConfig.pushCategory(customCategory.value);
    }
}

</script>

<template>
    <div class="flex p-1 max-h-8">
        <input type="text" placeholder="cattegory" class="m-0 p-0.5 rounded-md" v-model="customCategory">
        <submitButton :callback="commitCustomCategory" />
    </div>

</template>