import { createRouter, createWebHistory } from "vue-router";
import { ticketRoutes } from "../domains/tickets/routes";
import { userRoutes } from "../domains/users/routes";
import { authRoutes } from "../domains/auth/routes";
import { checkAuthentication } from "../services/http/authcheck.ts";

export const router = createRouter({
    history: createWebHistory(),
    routes: [...authRoutes, ...ticketRoutes, ...userRoutes],
});

// Attempt to make only the login page viewable for unauthenticated users

// router.beforeEach((to, from) => {
//     // ...
//     //const isAuthenticated = localStorage.getItem("user-token");
//     const isAuthenticated = checkAuthentication;
//     console.log("Authenticated?");
//     console.log(isAuthenticated.value);
//     console.log(to.name);
//     if (isAuthenticated !== null && to.name !== "auth.login") {
//         // redirect the user to the login page
//         return { name: "auth.login" };
//     }
//     console.log("nothing on the hand");
// });
