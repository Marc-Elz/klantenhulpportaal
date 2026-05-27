import { createRouter, createWebHistory } from "vue-router";
import { ticketRoutes } from "../domains/tickets/routes";
import { userRoutes } from "../domains/users/routes";
import { authRoutes } from "../domains/auth/routes";
import { categoryRoutes } from "../domains/categories/routes";

export const router = createRouter({
    history: createWebHistory(),
    routes: [...authRoutes, ...ticketRoutes, ...userRoutes, ...categoryRoutes],
});

// Attempt to make only the login page viewable for unauthenticated users
// router.beforeEach((to, from) => {
//     // ...
//     //const isAuthenticated = localStorage.getItem("user-token");
//     const isAuthenticated = localStorage.getItem("laravel-session");
//     console.log("Authenticated?");
//     console.log(isAuthenticated);
//     console.log(to.name);
//     if (!isAuthenticated && to.name !== "auth.login") {
//         // redirect the user to the login page
//         return { name: "auth.login" };
//     }
//     console.log("nothing on the hand");
// });
