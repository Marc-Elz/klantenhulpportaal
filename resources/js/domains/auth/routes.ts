import Forbidden from "./pages/Forbidden.vue";
import ForgotPassword from "./pages/Forgot-password.vue";
import PasswordReset from "./pages/PasswordReset.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";

export const authRoutes = [
    { path: "/login", component: Login, name: "auth.login" },
    {
        path: "/register",
        component: Register,
        name: "auth.register",
    },
    {
        path: "/forgot-password",
        component: ForgotPassword,
        name: "auth.forgot-password",
    },
    {
        path: "/reset-password",
        component: PasswordReset,
        name: "auth.reset-password",
    },
    { path: "/403", component: Forbidden, name: "auth.403" },
];
