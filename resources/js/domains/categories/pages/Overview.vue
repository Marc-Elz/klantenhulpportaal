<template>
    <h1>Categorie overview</h1>

    <ErrorMessage />
    <div class="table-container">
        <table class="minimal-table">
            <thead>
                <tr>
                    <th>Naam</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="category in getAllCategoriesSorted" :key="category.id">
                    <td>{{ category.name }}</td>
                    <td>
                        <router-link
                            :to="{
                                name: 'categories.edit',
                                params: { id: category.id },
                            }"
                        >
                            Bewerk
                        </router-link>
                    </td>
                    <td>
                        <button @click="promptDeleteCategory(category)">
                            Verwijder
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { deleteCategory, fetchCategories, getAllCategories, getAllCategoriesSorted } from "../store";
import { categoryType } from "../../../services/store/storeTypes";
import ErrorMessage from "../../../components/ErrorMessage.vue";

function promptDeleteCategory(category: categoryType) {
    // Better version "Are you sure you want to delete category: {category.name} "; but not supported with window.cofirm
    const confirmed = window.confirm("Press OK to confirm deletion");
    console.log(confirmed);
    if (confirmed) {
        deleteCategory(category.id);
    }
}

onMounted(() => {
    fetchCategories();
});
</script>
