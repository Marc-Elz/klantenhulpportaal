<template>
    <div class="profile-bar">
        <div v-if="isLoggedIn">
            <button @click="logUserOut()">Log out</button>
            <h1>Welcome {{ user.name }}</h1>
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
    getStoredUser,
} from "../domains/auth/store";
import { useRouter } from "vue-router";
import { computed, onMounted, ref, watch } from "vue";
import { globalUser } from "../domains/auth/store";

const router = useRouter();
const logUserOut = () => {
    logout();
    router.push({ name: "auth.login" });
    user.value = null;
};

const user = ref(null);
const isLoggedIn = computed(() => !!user.value);

const checkAuth = () => {
    const response = getCurrentUser();
    if (response != null) {
        user.value = response;
    }
};

watch(globalUser, (newVal) => {
    if (newVal) {
        checkAuth();
    }
});

const initializeUserFromStorage = () => {
    const storedUser = getStoredUser();
    if (storedUser) {
        user.value = storedUser;
    }
};

onMounted(() => {
    initializeUserFromStorage();
    if (!user.value) {
        fetchSetUser().then((response) => {
            if (response) {
                user.value = response;
                console.log("User data fetched:", response);
            }
        });
    }
});
</script>
