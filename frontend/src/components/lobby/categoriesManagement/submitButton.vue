<script setup lang="ts">
const props = defineProps<{
    callback: ()=>void,
}>();
</script>

<template>
    <button @click="props.callback" class="flex items-center bg-green-500 border border-neutral-900 m-0 p-3">+</button>
</template>