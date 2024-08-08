<script setup>
import router from "../router";
import Brand from "./Brand.vue";
import setUserdata from "./functions/setUserData";
import socket from '../socket';
import axios from "axios";

const username = defineModel();

getUserIdIfnull() // put it somewhere where it will be called every time

function getUserIdIfnull(){
    const userId = localStorage.getItem("userId");
    console.log("userId equals ", userId)
    if(!userId){
        console.log("fetching new userId");
        axios.get("http://localhost:3000/userId")
        .then(response =>{
            console.log("setting userId to : ", response.data);
            localStorage.setItem("userId", response.data);
        })
    }
}

async function commit(route, newGame){
    let _username;
    const localStUsrname = localStorage.getItem("username");

    if(username.value){
        _username = username.value;
    }else if (localStUsrname){
        _username = localStUsrname;
    }
    setUserdata("username", _username);
    if(newGame){
        createGame();
    }

    router.push(route);
}

function createGame() {
    const username = localStorage.getItem("username");
    socket.emit("createRoom", localStorage.getItem("userId"), username);
}
</script>

<template>
        <div class="flex justify-center flex-col items-center
        bg-zinc-800 shadow-xl rounded-lg
        pt-2 pb-2 pl-1 pr-1">
            <Brand />
            <input type="text" name="username" placeholder="Username" class="mb-5 w-2/3 bg-neutral-900 border border-1 border-zinc-400 rounded-md p-2 outline-none" v-model="username">
            <div class="flex flex-row">
                <div class="flex items-center align-middle justify-center w-button rounded-md bg-neutral-900 h-12 m-1 pb-1 cursor-pointer" @click="commit('/lobby', true)">
                    Create New Room
                </div>
                <div class="flex items-center justify-center w-button rounded-md bg-neutral-900 h-12 m-1 pb-1 cursor-pointer" @click="commit('/join', false)">
                    Join Room
                </div>
            </div>
        </div>
</template>