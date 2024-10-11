import { createRouter, createWebHistory } from "vue-router";

const routes = [
    //Lobby
    { path: "/", name: "index", component: () => import('./templates/Index.vue') },
    { path: "/join", name: "join", component: () => import('./templates/JoinGame.vue') },
    { path: "/lobby", name: "lobby", component: () => import('./templates/Lobby.vue') },
    //In-Game
    { path: "/form", name: "form", component: () => import('./templates/Form.vue') },
    { path: "/voting", name: "voting", component: () => import('./templates/Voting.vue') },
    { path: "/results", name: "results", component: () => import('./templates/Results.vue') },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    next();
});

export default router;