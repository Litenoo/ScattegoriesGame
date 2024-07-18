import { createRouter, createWebHistory} from "vue-router";

const routes = [
    {path: "/", component: ()=>import('./components/Index.vue')},
    {path: "/join", component: ()=>import('./components/JoinGame.vue')},
    {path: "/create", component: ()=>import('./components/Lobby.vue')},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;