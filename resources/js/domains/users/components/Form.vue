<template>
    <ErrorMessage />
    <form @submit.prevent="handleSubmit">
        <label>Naam:</label>
        <input v-model="form.name" type="text" required />
        <FormError :name="'name'" />
        <label>Email:</label>
        <input v-model="form.email" type="text" required />
        <FormError :name="'email'" />
        <label>Phone number:</label>
        <input v-model="form.phone_number" type="text" required />
        <FormError :name="'phone_number'" />
        <label>Role:</label>
        <select v-model="form.role" required>
            <option v-for="role in roles" :key="role" :value="role">
                {{ role }}
            </option>
        </select>
        <FormError :name="'role'" />

        <button type="submit">Opslaan</button>
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FormError from "../../../components/FormError.vue";
import ErrorMessage from "../../../components/ErrorMessage.vue";
import { Role } from "../../../services/store/storeTypes.ts";

const props = defineProps({ user: Object });

const emit = defineEmits(["submit"]);

const form = ref({ ...props.user });

const handleSubmit = () => emit("submit", form.value);

const roles: Role[] = ["user", "admin"];
</script>
