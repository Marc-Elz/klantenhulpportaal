<template>
    <ErrorMessage />
    <form @submit.prevent="handleSubmit">
        <label>Titel:</label>
        <input v-model="form.title" type="text" required />
        <FormError :name="'title'" />

        <label>Beschrijving:</label>
        <textarea v-model="form.description" required></textarea>
        <FormError :name="'description'" />

        <label>Categorieën:</label>
        <select multiple="true" v-model="form.category_ids" required>
            <option
                v-for="category in getAllCategories"
                :key="category.id"
                :value="category.id"
            >
                {{ category.name }}
            </option>
        </select>

        <label>Priority:</label>
        <select v-model="form.priority" required>
            <option
                v-for="priority in priorities"
                :key="priority"
                :value="priority"
            >
                {{ priority }}
            </option>
        </select>

        <label>Status:</label>
        <select v-model="form.status" required>
            <option v-for="status in statuses" :key="status" :value="status">
                {{ status }}
            </option>
        </select>

        <label>Asignee:</label>
        <select v-model="form.user_asignee_id" required>
            <option
                v-for="admin in getAllAdmins"
                :key="admin.id"
                :value="admin.id"
            >
                {{ admin.name }}
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
import type { Priority, Status } from "../../../services/store/storeTypes.ts";
import { fetchCategories, getAllCategories } from "../../categories/store.ts";
import { fetchUsers, getAllAdmins } from "../../users/store.ts";

const props = defineProps({ ticket: Object });

const emit = defineEmits(["submit"]);

const priorities: Priority[] = ["low", "medium", "high"];
const statuses: Status[] = ["open", "resolved", "closed", "in_progress"];

const form = ref({ ...props.ticket });

const handleSubmit = () => emit("submit", form.value);

onMounted(() => {
    fetchCategories();
    fetchUsers();
});
</script>
