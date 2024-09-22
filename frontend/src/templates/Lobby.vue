<script setup lang="ts">
import Settings from "@/components/lobby/Settings.vue";
import PlayerList from "@/components/lobby/PlayersList.vue";
</script>

<template>
   <div class="flex items-center flex-row bg-zinc-800 shadow-xl rounded-lg p-2 min-w-12 max-w-[46vw]">
      <PlayerList/>
      <Settings />
   </div>
</template>