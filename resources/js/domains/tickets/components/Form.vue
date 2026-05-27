<template>
    <ErrorMessage />
    <form @submit.prevent="handleSubmit">
        <label>Titel:</label>
        <input v-model="form.title" type="text" required />
        <FormError :name="'title'" />

        <label>Bescrhijving:</label>
        <textarea v-model="form.content" required></textarea>
        <FormError :name="'content'" />

        <label>Categorieën:</label>
        <select v-model="form.category_id" required>
            <option
                v-for="category in getAllCategories"
                :key="category.id"
                :value="category.id"
            >
                {{ category.name }}
            </option>
        </select>

        <FormError :name="'ticket_id'" />

        <button type="submit">Opslaan</button>
    </form>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import FormError from "../../../components/FormError.vue";
import ErrorMessage from "../../../components/ErrorMessage.vue";

const props = defineProps({ review: Object });

const emit = defineEmits(["submit"]);

const form = ref({ ...props.review });

const handleSubmit = () => emit("submit", form.value);

onMounted(() => {});
</script>
