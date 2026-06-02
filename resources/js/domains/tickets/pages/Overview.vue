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
            <tbody>
                <tr v-for="ticket in getAllTickets" :key="ticket.id">
                    <td>{{ ticket.id }}</td>
                    <td>{{ ticket.title }}</td>
                    <td>{{ ticket.category_ids }}</td>
                    <!-- now gets a collection, should only show the names of categories-->
                    <td :style="{ color: getColor(ticket.status) }">
                        {{ ticket.status }}
                    </td>
                    <td>{{ getUserById(ticket.submitter_id).value.name }}</td>
                    <td>{{ ticket.created_at }}</td>
                    <td>{{ ticket.updated_at }}</td>
                    <td>
                        {{ getUserById(ticket.user_asignee_id).value.name }}
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
