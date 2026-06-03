<template>
    <div>
        <h2>Nieuwe categorie toevoegen</h2>
        <Form :category="category" @submit="handleSubmit" />
    </div>
</template>
<script setup lang="ts">
import Form from "../components/Form.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { categoryType } from "../../../services/store/storeTypes";
import { createCategory } from "../store";

const router = useRouter();

const category = ref({
    name: "",
});

const handleSubmit = async (data: categoryType) => {
    await createCategory(data);
    router.push({ name: "categories.overview" });
};
</script>
