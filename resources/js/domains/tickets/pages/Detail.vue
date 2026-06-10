<template>
    <h1>Ticket details: {{ ticket?.title }}</h1>
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
            <td>
                {{
                    new Date(ticket?.created_at).toLocaleString("nl-NL", {
                        timeZoneName: "short",
                    })
                }}
            </td>
        </tr>
        <tr>
            <th>Laatst gewijzigd</th>
            <td>
                {{
                    new Date(ticket?.updated_at).toLocaleString("nl-NL", {
                        timeZoneName: "short",
                    })
                }}
            </td>
        </tr>
    </div>

    <div>
        <h2>Discussion</h2>
        <TicketDiscussion :ticket_id="ticket_id" />
        <div v-if="isAdmin">
            <CommentForm :comment="new_text" @submit="handleCommentSubmit" />
        </div>
    </div>

    <div>
        <h2>Notes</h2>
        <NoteList :ticket_id="ticket_id" />
        <div v-if="isAdmin">
            <NoteForm :note="new_text" @submit="handleNoteSubmit" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import ErrorMessage from "../../../components/ErrorMessage.vue";
import { default as CommentForm } from "../../comments/components/Form.vue";
import { default as NoteForm } from "../../notes/components/Form.vue";
import TicketDiscussion from "../../comments/components/TicketDiscussion.vue";
import NoteList from "../../notes/components/NoteList.vue";
import { fetchTickets, getTicketById } from "../store";
import { getUserById, fetchUsers } from "../../users/store.ts";
import { commentType, noteType } from "../../../services/store/storeTypes.ts";
import {
    createComment,
    fetchComments,
    setTicketId as commentSetTicketId,
} from "../../comments/store.ts";
import { isAdmin } from "../../auth/store.ts";
import {
    createNote,
    fetchNotes,
    setTicketId as noteSetTicketId,
} from "../../notes/store.ts";

const route = useRoute();

const ticket_id = route.params.id as string | number;

const ticket = getTicketById(ticket_id);

const new_text = {
    ticket_id: ticket_id,
    content: "",
};

const handleCommentSubmit = async (data: commentType) => {
    await createComment(data);
};

const handleNoteSubmit = async (data: noteType) => {
    await createNote(data);
};

onMounted(() => {
    fetchTickets();
    fetchUsers();
    commentSetTicketId(ticket_id);
    noteSetTicketId(ticket_id);
    fetchNotes();
    fetchComments();
});
</script>
