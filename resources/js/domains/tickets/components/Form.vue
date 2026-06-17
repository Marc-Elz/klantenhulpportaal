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
        <select
            v-model="selectedCategoryIds"
            multiple="true"
            class="multi-select"
            required
        >
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

        <FormError :name="'ticket_id'" />

        <button type="submit">Opslaan</button>
    </form>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import FormError from "../../../components/FormError.vue";
import ErrorMessage from "../../../components/ErrorMessage.vue";
import type {
    categoryType,
    Priority,
} from "../../../services/store/storeTypes.ts";
import { fetchCategories, getAllCategories } from "../../categories/store.ts";

const props = defineProps({ ticket: Object });

const emit = defineEmits(["submit"]);

const priorities: Priority[] = ["low", "medium", "high"];

const form = ref({ ...props.ticket });

const selectedCategoryIds = ref([]);

const handleSubmit = () => {
    console.log("Form value after:", form.value);
    console.log("Category value after:", selectedCategoryIds.value);
    let payload;
    if (selectedCategoryIds.value) {
        console.log("category values", selectedCategoryIds.value);
        payload = {
            ...form.value,
            category_ids: selectedCategoryIds.value,
        };
    }

    console.log(payload);

    emit("submit", payload);
};

onMounted(async () => {
    fetchCategories();
    if (props.ticket && props.ticket.category_ids) {
        console.log(props.ticket.category_ids.value);
        selectedCategoryIds.value = props.ticket.category_ids.map(
            (category: categoryType) => category.id,
        );
    }
});
</script>
