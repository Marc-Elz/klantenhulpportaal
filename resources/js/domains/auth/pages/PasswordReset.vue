<template>
    <div class="container">
        <h1>Reset uw wachtwoord</h1>
        <ErrorMessage />
        <form @submit.prevent="handleSubmit(form)">
            <label>Email:</label>
            <input v-model="form.email" type="text" required />
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
            <button type="submit">Reset Wachtwoord</button>
        </form>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { resetPasswordPayload } from "../../../services/store/storeTypes";
import { resetPassword } from "../store";
import FormError from "../../../components/FormError.vue";
import { setMessage } from "../../../services/error/index.ts";
import ErrorMessage from "../../../components/ErrorMessage.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const form = ref<resetPasswordPayload>({
    email: "",
    password: "",
    password_confirmation: "",
    token: route.query.token as string,
});

const handleSubmit = async (data: resetPasswordPayload) => {
    if (form.value.password === form.value.password_confirmation) {
        const response = await resetPassword(data);

        if (response && response.status === 200) {
            router.push({ name: "auth.login" });
        }
    } else {
        setMessage("Passwords don't match");
    }
};
</script>
