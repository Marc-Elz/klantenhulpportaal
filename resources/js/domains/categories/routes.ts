import Create from "./pages/Create.vue";
import Overview from "./pages/Overview.vue";

export const categoryRoutes = [
    {
        path: "/categories",
        component: Overview,
        name: "categories.overview",
        meta: { requiresAuth: true, allowedRoles: ["admin"] },
    },

    {
        path: "/create",
        component: Create,
        name: "categories.create",
        meta: { requiresAuth: true, allowedRoles: ["admin"] },
    },
];
