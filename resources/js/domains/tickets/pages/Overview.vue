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
                </tr>
            </thead>
            <tbody>
                <tr v-for="ticket in getAllTickets" :key="ticket.id">
                    <td>{{ ticket.id }}</td>
                    <td>{{ ticket.title }}</td>
                    <td>{{ ticket.category_ids }}</td>
                    <td>{{ ticket.status }}</td>
                    <td>{{ ticket.submitter_id }}</td>
                    <td>{{ ticket.created_at }}</td>
                    <td>{{ ticket.updated_at }}</td>
                    <td>{{ ticket.asignee_id }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import ErrorMessage from "../../../components/ErrorMessage.vue";
import { getAllTickets, fetchTickets } from "../store";

fetchTickets();
</script>
