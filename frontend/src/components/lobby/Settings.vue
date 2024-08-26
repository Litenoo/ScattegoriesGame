<script setup>
import CharacterSelect from './letterSelect/CharacterSelect.vue';
import CategoriesSelect from './categoriesSelect/CategoriesSelect.vue';

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
            <input type="number" required value="10" placeholder="Max Player Quantity" class="m-1 p-0.5 rounded-md" v-model="playersQuantity">
            <input type="number" required value="90" placeholder="PlayTime (in seconds)" max="600" class="m-1 p-0.5 rounded-md" v-model="playTime">
            Characters : 
            <CharacterSelect/>
            Categories :
            <CategoriesSelect/>
        </form>
    </div>
</template>