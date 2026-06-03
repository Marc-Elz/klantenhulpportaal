import Overview from "./pages/Overview.vue";

export const userRoutes = [
    {
        path: "/users",
        component: Overview,
        name: "users.overview",
        meta: { requiresAuth: true, allowedRoles: ["admin"] },
    },
];
