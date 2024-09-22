<script lang="ts" setup>
import Input from "./AnswearInput.vue";
import { useGameConfigStore } from "@/store/store";

const store = useGameConfigStore();

const categories = store.gameConfig.getCategories;
const answears = store.userData?.answears;


</script>

<template>
  <Input v-for="(answear, index) in answears" :title="answear.value.category" :referenceValue="answear" />
</template>