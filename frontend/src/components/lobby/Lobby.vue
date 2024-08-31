<script setup lang="ts">
import Settings from "./Settings.vue";
import PlayerList from "./PlayersList.vue";
</script>

<template>
   <div class="flex items-center flex-row bg-zinc-800 shadow-xl rounded-lg p-2 min-w-12">
      <PlayerList/>
      <Settings />
   </div>
</template>