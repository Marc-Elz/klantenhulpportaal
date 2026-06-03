<template>
    <ErrorMessage />
    <form @submit.prevent="handleSubmit">
        <label>name:</label>
        <input v-model="form.name" type="text" required />
        <FormError :name="'name'" />

        <button type="submit">Opslaan</button>
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FormError from "../../../components/FormError.vue";
import ErrorMessage from "../../../components/ErrorMessage.vue";

const props = defineProps({ category: Object });

const emit = defineEmits(["submit"]);

const form = ref({ ...props.category });

const handleSubmit = () => emit("submit", form.value);
</script>
