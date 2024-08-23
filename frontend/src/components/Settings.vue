<template>
    <div class="flex flex-col pl-3">
        Settings
        <input type="text" placeholder="cattegory" class="m-1 p-0.5 rounded-md">
        <input type="number" required placeholder="Time (in seconds)" max="600" class="m-1 p-0.5 rounded-md">
        <div class="flex flex-wrap max-w-96">
            <label for="letter" v-for="letter in alphabet">
                {{ letter }}<input type="checkbox" checked name="letter">
            </label>
        </div>
    </div>
</template>