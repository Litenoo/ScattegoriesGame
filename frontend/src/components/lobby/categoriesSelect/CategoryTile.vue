<script setup>
const props = defineProps({category: String});

function removeCategory(){
    
}

</script>

<template>
    <div>
        {{ category }} <span @click="removeCategory()"></span>
    </div>
</template>