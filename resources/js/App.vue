<script setup lang="ts">
import { useRouter } from "vue-router";
import Login from "./domains/auth/pages/Login.vue";
import { logout, fetchUser } from "./domains/auth/store";
const router = useRouter();

function logUserOut() {
    logout();
    router.push({ name: "auth.login" });
}
</script>

<template>
    <button @click="logUserOut()">Log out</button>
    <button @click="fetchUser()">Fetch current user</button>
    <nav>
        <router-link :to="{ name: 'auth.login' }"> Log in </router-link>
    </nav>
    <router-view />

    <nav class="bottom-nav">
        <ul>
            <li>
                <router-link :to="{ name: 'tickets.overview' }">
                    Ticket overview
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'users.overview' }">
                    User overview
                </router-link>
            </li>
        </ul>
    </nav>
</template>
