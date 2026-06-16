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
            <div v-if="isAdmin">
                <td>
                    <form>
                        <select
                            v-model="updatedTicket.status"
                            required
                            @change="handleChangeStatus"
                        >
                            <option
                                v-for="status in statuses"
                                :key="status"
                                :value="status"
                            >
                                {{ status }}
                            </option>
                        </select>
                    </form>
                </td>
            </div>
            <div v-else>
                <td>{{ ticket?.status }}</td>
            </div>
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
            <div v-if="isAdmin">
                <td>
                    <form>
                        <select
                            v-model="updatedTicket.user_asignee_id"
                            required
                            @change="handleChangeAsignee"
                        >
                            <option
                                v-for="admin in getAllAdmins"
                                :key="admin.id"
                                :value="admin.id"
                            >
                                {{ admin.name }}
                            </option>
                        </select>
                    </form>
                </td>
            </div>
            <div v-else>
                <td>
                    <div v-if="ticket?.user_asignee_id">
                        {{ getUserById(ticket?.user_asignee_id).value?.name }}
                    </div>
                    <div v-else>Unassigned</div>
                </td>
            </div>
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
                        .map((c: categoryType) => c.name)
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
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import ErrorMessage from "../../../components/ErrorMessage.vue";
import { default as CommentForm } from "../../comments/components/Form.vue";
import { default as NoteForm } from "../../notes/components/Form.vue";
import TicketDiscussion from "../../comments/components/TicketDiscussion.vue";
import NoteList from "../../notes/components/NoteList.vue";
import { fetchTickets, getTicketById, updateTicket } from "../store";
import { getUserById, fetchUsers, getAllAdmins } from "../../users/store.ts";
import {
    categoryType,
    commentType,
    noteType,
    Status,
    ticketType,
} from "../../../services/store/storeTypes.ts";
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
const updatedTicket = ref<ticketType>({
    ...ticket.value,
});

const statuses: Status[] = ["open", "resolved", "closed", "in_progress"];

const handleChangeAsignee = async () => {
    await updateTicket(ticket_id, updatedTicket.value);
};

const handleChangeStatus = async () => {
    await updateTicket(ticket_id, updatedTicket.value);
};

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

onMounted(async () => {
    await fetchTickets();
    await fetchUsers();
    commentSetTicketId(ticket_id);
    noteSetTicketId(ticket_id);
    await fetchNotes();
    await fetchComments();

    if (ticket.value) {
        updatedTicket.value = { ...ticket.value };
    }
});
</script>
