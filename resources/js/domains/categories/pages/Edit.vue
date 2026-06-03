<template>
    <div>
        <h2>Edit categorie</h2>
        <Form :category="category" @submit="handleSubmit" />
    </div>
</template>

<script setup lang="ts">
import Form from "../components/Form.vue";
import { useRoute, useRouter } from "vue-router";
import { categoryType } from "../../../services/store/storeTypes";
import { getCategoryById, updateCategory } from "../store";

const router = useRouter();
const route = useRoute();

const category_id = route.params.id as string | number;

const category = getCategoryById(category_id);

const handleSubmit = async (data: categoryType) => {
    await updateCategory(category_id, data);
    router.push({ name: "categories.overview" });
};
</script>
