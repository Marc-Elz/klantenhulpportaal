<template>
    <ErrorMessage />
    <form @submit.prevent="handleSubmit">
        <label>Email:</label>
        <input v-model="form.email" type="text" required />
        <FormError :name="'email'" />
        <br />
        <label>Password:</label>
        <input v-model="form.password" type="password" required />
        <FormError :name="'password'" />
        <br />

        <button type="submit">Log in</button>
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FormError from "../../../components/FormError.vue";
import ErrorMessage from "../../../components/ErrorMessage.vue";

const emit = defineEmits(["submit"]);

const form = ref({ email: "", password: "" });
const handleSubmit = () => emit("submit", form.value);
</script>
