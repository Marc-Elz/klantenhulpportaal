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
                    <th>Phone number</th>
                    <th>Manage</th>
                </tr>
            </thead>
            <tbody v-for="user in getAllUsers" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.role }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.phone_number }}</td>
                <td>
                    <router-link
                        :to="{
                            name: 'users.edit',
                            params: { id: user.id },
                        }"
                    >
                        Bewerk
                    </router-link>
                </td>
                <td>
                    <button @click="promptDeleteUser(user.id)">Delete</button>
                </td>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import ErrorMessage from "../../../components/ErrorMessage.vue";
import { deleteUser, fetchUsers, getAllUsers } from "../store.ts";

function promptDeleteUser(userId: number) {
    // Better version "Are you sure you want to delete user: {user.name} "; but not supported with window.cofirm
    const confirmed = window.confirm("Press OK to confirm deletion");
    console.log(confirmed);
    if (confirmed) {
        deleteUser(userId);
    }
}

onMounted(() => {
    fetchUsers();
});
</script>
