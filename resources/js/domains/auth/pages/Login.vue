<template>
    <h1>Please sign in</h1>
    <Form @submit="handleSubmit" />
</template>

<script setup lang="ts">
import Form from "../components/Form.vue";
import { useRouter } from "vue-router";
import { authType } from "../../../services/store/storeTypes";
import { authenticate } from "../store";

const router = useRouter();

const handleSubmit = async (data: authType) => {
    await authenticate(data);
    router.push({ name: "tickets.overview" });
};
</script>
