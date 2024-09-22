<script setup lang="ts">
import { Ref } from "vue";
import { Answear } from "@/store/subClasses/UserConfig";

const props = defineProps<{
    referenceValue: Ref<Answear>,
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