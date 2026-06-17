import Edit from "./pages/Edit.vue";
import Overview from "./pages/Overview.vue";

export const userRoutes = [
    {
        path: "/users",
        component: Overview,
        name: "users.overview",
        meta: { requiresAuth: true, allowedRoles: ["admin"] },
    },
    {
        path: "/users/:id/edit",
        component: Edit,
        name: "users.edit",
        meta: { requiresAuth: true },
    },
];
