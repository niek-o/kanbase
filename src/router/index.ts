import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/userStore";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("../views/HomeView.vue"),
            meta: { requiresAuth: true }
        },
        {
            path: "/sign-in",
            name: "Sign in",
            component: () => import("../views/SignInView.vue")
        }
    ]
});


router.beforeEach((to, from, next) => {
    const userStore = useUserStore();

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!userStore.user) {
            next({
                name: "Sign in"
            });
        }
    }
    next();
});

export default router;
