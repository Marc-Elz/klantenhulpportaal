<template>
    <div class="container">
        <form @submit.prevent="handleSubmit">
            <label>Email:</label>
            <input v-model="form.email" type="text" required />
            <br />
            <label>Naam:</label>
            <input v-model="form.name" type="text" required />
            <br />
            <label>Telefoonnummer:</label>
            <input v-model="form.phone_number" type="text" />
            <br />
            <label>Wachtwoord:</label>
            <input
                v-model="form.password"
                minlength="8"
                type="password"
                required
            />
            <br />
            <label>Herhaal uw wachtwoord</label>
            <input
                v-model="form.password_confirmation"
                type="password"
                required
            />
            <br />
            <FormError :name="'password'" />

            <p
                v-if="form.password.length > 0 && form.password.length < 8"
                :class="'error-style'"
            >
                Password must be at least 8 characters.
            </p>
            <p
                v-else-if="form.password !== form.password_confirmation"
                :class="'error-style'"
            >
                Passwords dont match
            </p>

            <br />
            <button type="submit">Maak account</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FormError from "../../../components/FormError.vue";

const emit = defineEmits(["submit"]);

const form = ref({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone_number: "",
});
const handleSubmit = () => emit("submit", form.value);
</script>
