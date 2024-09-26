<script setup lang="ts">
import { Ref } from "vue";
import { Answear } from "@/store/subClasses/RoomConfig";

const props = defineProps<{
    answear: Answear,
}>();

</script>

<template>
    <div class="bg-neutral-800 border m-2 p-1 rounded-md">
        {{ answear.category }}
        <input type="text" v-model="answear.answear">
    </div>
</template>