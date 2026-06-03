import Forbidden from "./pages/Forbidden.vue";
import Login from "./pages/Login.vue";

export const authRoutes = [
    { path: "/login", component: Login, name: "auth.login" },
    { path: "/403", component: Forbidden, name: "auth.403" },
];
