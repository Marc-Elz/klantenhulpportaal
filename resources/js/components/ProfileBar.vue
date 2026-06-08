<template>
    <div class="profile-bar">
        <div v-if="isLoggedIn">
            <button @click="logUserOut()">Log out</button>
            <h1>Welcome {{ getCurrentUser && getCurrentUser.name }}</h1>
        </div>
        <div v-else>
            <router-link :to="{ name: 'auth.login' }"> Log in </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    logout,
    fetchSetUser,
    getCurrentUser,
} from "../domains/auth/store";
import { useRouter } from "vue-router";
import { computed, onMounted} from "vue";


const router = useRouter();
const isLoggedIn = computed(() => !!getCurrentUser.value);

const logUserOut = async () => {
    await logout();
    router.push({ name: "auth.login" });
};


onMounted(() => {
    if (!getCurrentUser.value) {
        fetchSetUser()
    }
});
</script>
