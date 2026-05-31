import { createRouter, createWebHistory } from "vue-router";
import { ticketRoutes } from "../domains/tickets/routes";
import { userRoutes } from "../domains/users/routes";
import { authRoutes } from "../domains/auth/routes";
import { categoryRoutes } from "../domains/categories/routes";
import { getCurrentUser, fetchSetUser } from "../domains/auth/store";

export const router = createRouter({
    history: createWebHistory(),
    routes: [...authRoutes, ...ticketRoutes, ...userRoutes, ...categoryRoutes],
});

// Attempt to make only the login page viewable for unauthenticated users
router.beforeEach(async (to) => {

    const requiresAuth = to.matched.some((route) => route.meta.requiresAuth);

    if (!requiresAuth) {
        return true;
    }

    let user = getCurrentUser();

    // Fetch user if laravel session exists but the user is not set in the store.
    if (!user) {
        try {
            user = await fetchSetUser();
        } catch {
            user = null;
        }
    }


    if (user) return true;
    return { name: "auth.login" };
});
