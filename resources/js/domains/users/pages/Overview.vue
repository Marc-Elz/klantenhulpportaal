<template>
    <ErrorMessage />
    <h1>Users overview</h1>
    <div class="table-container">
        <table class="minimal-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Naam</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>Manage</th>
                </tr>
            </thead>
            <tbody v-for="user in getAllUsers" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.role }}</td>
                <td>{{ user.email }}</td>
                <td><button @click="deleteUser(user.id)">Delete</button></td>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import ErrorMessage from "../../../components/ErrorMessage.vue";
import { deleteUser, fetchUsers, getAllUsers } from "../store.ts";
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
    fetchUsers();
});
</script>
