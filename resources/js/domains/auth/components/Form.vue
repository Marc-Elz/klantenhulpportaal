<template>
    <form @submit.prevent="handleSubmit">
        <label>Email:</label>
        <input v-model="form.email" type="text" required />
        <label>Password:</label>
        <input v-model="form.password" type="password" required />
        <br />

        <button type="submit">Log in</button>
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
const emit = defineEmits(["submit"]);

const form = ref({ email: "", password: "" });
const handleSubmit = () => emit("submit", form.value);
</script>
