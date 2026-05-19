<template>
    <nav>
        <router-link :to="{ name: 'tickets.overview' }">
            Ticket overview
        </router-link>
        <router-link :to="{ name: 'users.overview' }">
            User overview
        </router-link>
    </nav>
</template>
