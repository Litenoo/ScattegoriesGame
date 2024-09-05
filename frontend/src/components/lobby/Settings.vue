<script setup lang="ts">
import CharacterSelect from './characterSelect/CharacterSelect.vue';
import CategoriesSelect from './categoriesManagement/CategoriesSelect.vue';
import ActiveCategories from "./categoriesManagement/ActiveCategories.vue";
import { useGameConfigStore } from "@/store/lobbyConfig";

const store = useGameConfigStore();
const { maxPlayersQuantity, playTimeInSeconds, roundsQuantity } = store.gameConfig.settingsRefs;

</script>

<template>
    <div class="flex flex-col pl-3">

            Settings :
            <div class="flex justify-end items-center">
                Players Quantity
                <input type="number" required value="10" placeholder="Max Player Quantity" class="m-1 p-0.5 rounded-md" v-model.number="maxPlayersQuantity">
            </div>
            <div class="flex justify-end items-center">
                Play time
                <input type="number" required value="4" placeholder="PlayTime (in seconds)" max="600" class="m-1 p-0.5 rounded-md" v-model.number="playTimeInSeconds">
            </div>
            <div>
                Round Quantity
                <input type="number" placeholder="Number of rounds" class="m-1 p-0.5 rounded-md" v-model.number="roundsQuantity">
            </div>
            Characters :
            <CharacterSelect/>
            Sugested Categories :
            <CategoriesSelect/>
            Active Categories :
            <ActiveCategories/>
    </div>
</template>