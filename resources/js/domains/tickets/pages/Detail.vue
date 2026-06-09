<template>
    <h1>Detail page</h1>
    <router-link
        :to="{
            name: 'tickets.overview',
        }"
    >
        Return to overview
    </router-link>

    <h2>Details</h2>

    <ErrorMessage />
    <div class="table-container">
        <table class="minimal-table"></table>
        <tr>
            <th>ID</th>
            <td>{{ ticket?.id }}</td>
        </tr>
        <tr>
            <th>Titel</th>
            <td>{{ ticket?.title }}</td>
        </tr>
        <tr>
            <th>Beschrijving</th>
            <td>{{ ticket?.description }}</td>
        </tr>
        <tr>
            <th>Status</th>
            <td>{{ ticket?.status }}</td>
        </tr>
        <tr>
            <th>Prioriteit</th>
            <td>{{ ticket?.priority }}</td>
        </tr>
        <tr>
            <th>Indiener</th>
            <td>
                {{
                    getUserById(ticket?.submitter_id).value?.name ||
                    "Unknown Submitter"
                }}
            </td>
        </tr>
        <tr>
            <th>Toegewezen aan</th>
            <td>
                {{
                    getUserById(ticket?.user_asignee_id).value?.name ||
                    "Unassigned"
                }}
            </td>
        </tr>
        <tr>
            <th>Gemaakt op</th>
            <td>{{ ticket?.created_at }}</td>
        </tr>
        <tr>
            <th>Categorieën</th>
            <td>
                {{
                    ticket?.category_ids
                        .map((c: { id: number; name: string }) => c.name)
                        .join(", ")
                }}
            </td>
        </tr>
        <tr>
            <th>Gemaakt op</th>
            <td>{{ ticket?.created_at }}</td>
        </tr>
        <tr>
            <th>Laatst gewijzigd</th>
            <td>{{ ticket?.updated_at }}</td>
        </tr>
    </div>

    <div>
        <h2>Discussion</h2>
        <TicketDiscussion />
        <div v-if="isAdmin">
            <Form :ticket_id="ticket_id" @submit="handleCommentSubmit" />
        </div>
    </div>

    <div>
        <h2>Notes</h2>
        (Only visible for admins)
    </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import ErrorMessage from "../../../components/ErrorMessage.vue";
import Form from "../../comments/components/Form.vue";
import TicketDiscussion from "../../comments/components/TicketDiscussion.vue";
import { fetchTickets, getTicketById } from "../store";
import { getUserById, fetchUsers } from "../../users/store.ts";
import { commentType } from "../../../services/store/storeTypes.ts";
import {
    createComment,
    fetchComments,
    setTicketId,
} from "../../comments/store.ts";
import { isAdmin } from "../../auth/store.ts";

const route = useRoute();

const ticket_id = route.params.id as string | number;

const ticket = getTicketById(ticket_id);
console.log(ticket.value);

const handleCommentSubmit = async (data: commentType) => {
    await createComment(data);
};

onMounted(() => {
    fetchTickets();
    fetchUsers();
    setTicketId(ticket_id);
    fetchComments();
});
</script>
