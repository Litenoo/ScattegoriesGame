<script setup>
import CharacterSelect from './characterSelect/CharacterSelect.vue';
import CategoriesSelect from './categoryManagement/CategoriesSelect.vue';
import ActiveCategories from "./activeCategories/ActiveCategories.vue";


function commitForm(){
    console.log(playersQuantity.value, playTime.value);
}

const playersQuantity = defineModel("playersQuantity", 10);
const playTime = defineModel("playTime", 90);
</script>

<template>
    <div class="flex flex-col pl-3">
        <form action="" @submit.prevent="commitForm" class="flex flex-col">

            Settings :
            <div class="flex justify-end items-center">
                Players Quantity
                <input type="number" required value="10" placeholder="Max Player Quantity" class="m-1 p-0.5 rounded-md" v-model="playersQuantity">
            </div>
            <div class="flex justify-end items-center">
                Play time
                <input type="number" required value="90" placeholder="PlayTime (in seconds)" max="600" class="m-1 p-0.5 rounded-md" v-model="playTime">
            </div>
            Characters : 
            <CharacterSelect/>
            Sugested Categories :
            <CategoriesSelect/>
            Active Categories :
            <ActiveCategories/>
            
        </form>
    </div>
</template>