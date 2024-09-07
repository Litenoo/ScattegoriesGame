<script setup lang="ts">
import CharacterSelect from './characterSelect/CharacterSelect.vue';
import CategoriesSelect from './categoriesManagement/CategoriesSelect.vue';
import ActiveCategories from "./categoriesManagement/ActiveCategories.vue";
import SettingForm from "./settingsInputs/SettingForm.vue";
</script>

<template>
    <div class="flex flex-col pl-3">
            Settings :
            <SettingForm/>
            Characters :
            <CharacterSelect/>
            Sugested Categories :
            <CategoriesSelect/>
            Active Categories :
            <ActiveCategories/>
    </div>
</template>