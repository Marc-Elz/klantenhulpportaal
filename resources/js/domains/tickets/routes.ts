import Create from "./pages/Create.vue";
import Edit from "./pages/Edit.vue";
import Overview from "./pages/Overview.vue";

export const ticketRoutes = [
    {
        path: "/tickets",
        component: Overview,
        name: "tickets.overview",
        meta: { requiresAuth: true },
    },
    {
        path: "/create",
        component: Create,
        name: "tickets.create",
        meta: { requiresAuth: true },
    },
    {
        path: "/tickets/:id/edit",
        component: Edit,
        name: "tickets.edit",
        meta: { requiresAuth: true },
    },
];
