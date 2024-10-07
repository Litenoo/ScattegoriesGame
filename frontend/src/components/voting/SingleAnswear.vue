<script setup lang="ts">
import { serverVotingResponse } from 'shared/interfaces/voting';

const props = defineProps<{
    votingLabel: serverVotingResponse;
}>()
</script>

<template>
    Username : {{ votingLabel.username }}
</template>