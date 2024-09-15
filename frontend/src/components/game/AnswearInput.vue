<script setup lang="ts">
const props = defineProps<{
    referenceValue: string,
    title: string,
}>();

const textInput = defineModel<string>();
</script>

<template>
    <div class="bg-neutral-800 border m-2 p-1 rounded-md">
        {{ props.title }}
        <input type="text" v-model="textInput">
    </div>
</template>