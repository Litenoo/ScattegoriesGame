<script setup lang="ts">
import { Ref, onMounted } from "vue";
import { Answer } from "@/store/subClasses/RoomConfig";

const props = defineProps<{
  answer: Answer, // Ensure Answer type has reactive properties (e.g., Ref)
}>();

onMounted(() => {
  console.log("Prop on mounted: ", props.answer);
});
</script>

<template>
  <div class="bg-neutral-800 border m-2 p-1 rounded-md">
    {{ answer.category }}
    <input type="text" v-model="answer.answer.value" />
  </div>
</template>
