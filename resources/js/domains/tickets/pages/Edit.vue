<template>
    <div>
        <h2>Ticket bewerken</h2>
        <EditForm :ticket="ticket" @submit="handleSubmit" />
    </div>
</template>
<script setup lang="ts">
import EditForm from "../components/EditForm.vue";
import { useRoute, useRouter } from "vue-router";
import { ticketType } from "../../../services/store/storeTypes";
import { getTicketById, updateTicket } from "../store";

const router = useRouter();
const route = useRoute();

const ticket_id = route.params.id as string | number;

const ticket = getTicketById(ticket_id);

const handleSubmit = async (data: ticketType) => {
    await updateTicket(ticket_id, data);
    router.push({ name: "tickets.overview" });
};
</script>
