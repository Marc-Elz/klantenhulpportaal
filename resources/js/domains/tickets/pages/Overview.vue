<template>
    <ErrorMessage />
    <div class="table-container">
        <table class="minimal-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Titel</th>
                    <th>Categorieën</th>
                    <th>Status</th>
                    <th>Aangemaakt door</th>
                    <th>Aangemaakt op</th>
                    <th>Laatste update op</th>
                    <th>Toegewezen aan</th>
                    <th>Edit ticket</th>
                </tr>
            </thead>
            <tbody v-for="ticket in getAllTickets" :key="ticket.id">
                <tr class="clickable-row">
                    <td>{{ ticket.id }}</td>
                    <td>
                        <router-link
                            :to="{
                                name: 'tickets.detail',
                                params: { id: ticket.id },
                            }"
                            >{{ ticket.title }}
                        </router-link>
                    </td>
                    <td>
                        {{
                            ticket.category_ids
                                .map(
                                    (c: { id: number; name: string }) => c.name,
                                )
                                .join(", ")
                        }}
                    </td>
                    <td :style="{ color: getColor(ticket.status) }">
                        {{ ticket.status }}
                    </td>
                    <td>
                        {{
                            getUserById(ticket.submitter_id).value?.name ||
                            "Unknown Submitter"
                        }}
                    </td>
                    <td>{{ ticket.created_at }}</td>
                    <td>{{ ticket.updated_at }}</td>
                    <td>
                        {{
                            getUserById(ticket.user_asignee_id).value?.name ||
                            "Unassigned"
                        }}
                    </td>
                    <td>
                        <router-link
                            :to="{
                                name: 'tickets.edit',
                                params: { id: ticket.id },
                            }"
                        >
                            Bewerk
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import ErrorMessage from "../../../components/ErrorMessage.vue";
import { fetchUsers, getUserById } from "../../users/store.ts";
import { getAllTickets, fetchTickets } from "../store";
import { ticketType } from "../../../services/store/storeTypes.ts";
import { useRouter } from "vue-router";

const router = useRouter();

function clickList(ticket: ticketType) {
    router.push({ name: "tickets.detail", params: { id: ticket.id } });
}

const getColor = (status: string) => {
    switch (status) {
        case "resolved":
            return "green";
        case "closed":
            return "grey";
        case "open":
            return "red";
        case "in_progress":
            return "blue";
    }
};

onMounted(() => {
    fetchTickets();
    fetchUsers();
});
</script>
