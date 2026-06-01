<template>
    <div>
        <h2>Nieuwe ticket toevoegen</h2>
        <Form :ticket="ticket" @submit="handleSubmit" />
    </div>
</template>
<script setup lang="ts">
import Form from "../components/Form.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { ticketType } from "../../../services/store/storeTypes";
import { createTicket } from "../store";

const router = useRouter();

const ticket = ref({
    title: "",
    description: "",
    status: "",
    priority: "",
    category_ids: [],
});

const handleSubmit = async (data: ticketType) => {
    await createTicket(data);
    router.push({ name: "tickets.overview" });
};
</script>
