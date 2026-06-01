<script setup lang="ts">
import ProfileBar from "./components/ProfileBar.vue";
</script>

<template>
    <ProfileBar />

    <router-view />

    <nav class="bottom-nav">
        <ul>
            <li>
                <router-link :to="{ name: 'tickets.overview' }">
                    Ticket overview
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'tickets.create' }">
                    Ticket Create
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
