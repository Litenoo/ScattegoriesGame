<script setup lang="ts">
import CharacterSelect from './settings/CharacterSelect.vue';
import CategoriesSelect from './categories/CategoriesSelect.vue';
import ActiveCategories from "./categories/ActiveCategories.vue";
import SettingForm from "./settings/SettingForm.vue";
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