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
                <tr v-for="category in getAllCategories" :key="category.id">
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
                        <button @click="deleteCategory(category.id)">
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
import { deleteCategory, fetchCategories, getAllCategories } from "../store";

onMounted(() => {
    fetchCategories();
});
</script>
