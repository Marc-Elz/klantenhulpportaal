import Create from "./pages/Create.vue";
import Edit from "./pages/Edit.vue";
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

    {
        path: "/categories/:id/edit",
        component: Edit,
        name: "categories.edit",
        meta: { requiresAuth: true, allowedRoles: ["admin"] },
    },
];
