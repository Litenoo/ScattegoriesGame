<script setup>
import { userData } from "../store";
import socket from '../socket'
    function createGame(){
        console.log("creating room");
        socket.emit("createRoom");
    }
    
    createGame();

    function startGame(){

    }
</script>

<template>
    <div class="flex justify-center items-center flex-col bg-zinc-800 shadow-xl rounded-lg pt-2 pb-2 pl-1 pr-1">
        <span class="pb-2">Lobby</span>
        <div class="flex flex-col">
            <button @click="startGame()">Start Game</button>
        </div>
    </div>
</template>