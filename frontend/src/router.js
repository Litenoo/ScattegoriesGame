import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { path: "/", name: "index", component: () => import('./components/Index.vue') },
    { path: "/join", name: "join", component: () => import('./components/JoinGame.vue') },
    { path: "/lobby", name: "lobby", component: () => import('./components/lobby/Lobby.vue') },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.path !== "/") {
        if (localStorage.getItem("userId")) {
            console.log("has userId");
            next();
        } else {
            console.log("not userId");
            next({ name: "index" });
        }
    }else{
        next();
    }
});

export default router;