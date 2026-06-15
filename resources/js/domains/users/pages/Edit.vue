<template>
    <div>
        <h2>User bewerken</h2>
        <Form :user="user" @submit="handleSubmit" />
    </div>
</template>
<script setup lang="ts">
import Form from "../components/Form.vue";
import { useRoute, useRouter } from "vue-router";
import { userType } from "../../../services/store/storeTypes";
import { getUserById, updateUser } from "../store";

const router = useRouter();
const route = useRoute();

const user_id = route.params.id as string | number;

const user = getUserById(user_id);

const handleSubmit = async (data: userType) => {
    await updateUser(user_id, data);
    router.push({ name: "users.overview" });
};
</script>
