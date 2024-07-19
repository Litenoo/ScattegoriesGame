<script setup>
import router from "../router";
import Brand from "./Brand.vue";
import setUserdata from "./functions/setUserData"

const username = defineModel();

async function commit(route){
    let _username;
    const localStUsrname = localStorage.getItem("username");

    if(username.value){
        _username = username.value;
    }else if (localStUsrname){
        _username = localStUsrname;
    }

    setUserdata(_username);

    router.push(route);
}

</script>

<template>
        <div class="flex justify-center flex-col items-center
        bg-zinc-800 shadow-xl rounded-lg
        pt-2 pb-2 pl-1 pr-1">
            <Brand />
            <input type="text" name="username" placeholder="Username" class="mb-5 w-2/3 bg-neutral-900 border border-1 border-zinc-400 rounded-md p-2 outline-none" v-model="username">
            <div class="flex flex-row">
                <div class="flex items-center align-middle justify-center w-button rounded-md bg-neutral-900 h-12 m-1 pb-1 cursor-pointer" @click="commit('/create')">
                    Create New Room
                </div>
                <div class="flex items-center justify-center w-button rounded-md bg-neutral-900 h-12 m-1 pb-1 cursor-pointer" @click="commit('/join')">
                    Join Room
                </div>
            </div>
        </div>
</template>