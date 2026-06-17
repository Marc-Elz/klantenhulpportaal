<template>
    <div class="container">
        <h1>Wachtwoord vergeten?</h1>
        <h3>Stuur een wachtwoord resetlink naar uw email adres</h3>

        <form @submit.prevent="handleSubmit(form.email)">
            <label>Email</label>
            <input v-model="form.email" type="text" required />
            <FormError :name="form.email" />
            <button type="submit">Send link</button>
        </form>

        <div :class="'success-style'">{{ status }}</div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { authType } from "../../../services/store/storeTypes";
import { forgotPassword } from "../store";
import FormError from "../../../components/FormError.vue";

const form = ref({ email: "" });

const status = ref("");

const handleSubmit = async (data: string) => {
    const response = await forgotPassword(data);

    if (response && response.status === 200) {
        status.value = "Request was succesfull!, Check your email";
    }
};
</script>
