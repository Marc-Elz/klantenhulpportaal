<script setup lang="ts">
import Login from "./domains/auth/pages/Login.vue";
</script>

<template>
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
