import Forbidden from "./pages/Forbidden.vue";
import ForgotPassword from "./pages/Forgot-password.vue";
import Login from "./pages/Login.vue";

export const authRoutes = [
    { path: "/login", component: Login, name: "auth.login" },
    {
        path: "/forgot-password",
        component: ForgotPassword,
        name: "auth.forgot-password",
    },
    { path: "/403", component: Forbidden, name: "auth.403" },
];
