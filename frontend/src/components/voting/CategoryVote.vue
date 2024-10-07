<script setup lang="ts">
import SingleAnswear from "./SingleAnswear.vue";
import { serverVotingResponse } from "shared/interfaces/voting";

const props = defineProps<{
    category: string;
    votingLabel: serverVotingResponse;

}>();
</script>

<template>
    {{ props.category }}
    {{ props.votingLabel }}
    <SingleAnswear v-for="(label, index) in votingLabel" :votingLabel="label"/> 
</template>