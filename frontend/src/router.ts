import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { path: "/", name: "index", component: () => import('./templates/Index.vue') },
    { path: "/join", name: "join", component: () => import('./templates/JoinGame.vue') },
    { path: "/lobby", name: "lobby", component: () => import('./templates/Lobby.vue') },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    next();
});

export default router;