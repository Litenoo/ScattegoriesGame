<script setup lang="ts">
import { useGameConfigStore } from '@/store/store';
import CategoryVote from "@/components/voting/CategoryVote.vue";

const store = useGameConfigStore();

const categories = store.gameConfig.categories;
const votingLabel = store.currentRoom.votingLabel;

</script>

<template>
<CategoryVote v-for="category in categories" :category="category" :votingLabel="votingLabel" ></CategoryVote>
</template>