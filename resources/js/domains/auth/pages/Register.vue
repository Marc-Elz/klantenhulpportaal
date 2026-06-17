<template>
    <h2>Registreer je account</h2>
    <ErrorMessage />
    <RegisterForm @submit="handleSubmit" />
</template>
<script setup lang="ts">
import RegisterForm from "../components/RegisterForm.vue";
import ErrorMessage from "../../../components/ErrorMessage.vue";
import { registerPayload } from "../../../services/store/storeTypes.ts";
import { useRouter } from "vue-router";
import { register } from "../store.ts";

const router = useRouter();

const handleSubmit = async (data: registerPayload) => {
    const response = await register(data);

    if (response && response.status === 200) {
        router.push({ name: "auth.login" });
    }
};
</script>
