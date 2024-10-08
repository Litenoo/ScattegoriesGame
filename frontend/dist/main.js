"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
require("./style.css");
const App_vue_1 = __importDefault(require("./App.vue"));
const router_1 = __importDefault(require("./router"));
const pinia_1 = require("pinia");
const pinia = (0, pinia_1.createPinia)();
(0, vue_1.createApp)(App_vue_1.default).use(router_1.default).use(pinia).mount('#app');
