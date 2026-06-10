<template>
    <div class="container">
        <h1>Please sign in</h1>
        <Form @submit="handleSubmit" />
    </div>

    <router-link :to="{ name: 'auth.forgot-password' }">
        Forgot Password
    </router-link>
</template>

<script setup lang="ts">
import Form from "../components/Form.vue";
import { useRouter } from "vue-router";
import { authType } from "../../../services/store/storeTypes";
import { authenticate } from "../store";
import { fetchSetUser } from "../store";

const router = useRouter();

const handleSubmit = async (data: authType) => {
    const response = await authenticate(data);

    if (response && response.status === 200) {
        router.push({ name: "tickets.overview" });
        await fetchSetUser();
    }
};
</script>
