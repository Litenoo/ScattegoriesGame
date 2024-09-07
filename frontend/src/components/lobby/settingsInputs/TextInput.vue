<script setup lang="ts">
import { ref } from "vue";

function handleInput() {
    if(input.value === 0){
        input.value = 2;
    }
    props.callback(input.value);
}

type Setter = (value: number) => void;

interface Props {
    callback: Setter,
    description: string,
    defaultValue: number,
}

const props = defineProps<Props>();

const input = ref<number>(props.defaultValue);

</script>

<template>
    <div class="flex justify-end items-center">
        {{ description }}

        <input type="number" :placeholder=description class="m-1 p-0.5 rounded-md" @input="handleInput()"
            v-model="input">
    </div>
</template>