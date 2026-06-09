<template>
    <li v-for="note in getNotesSorted" :key="note.id">
        {{ note.content }}
        <br />
        {{ getUserById(note.user_id).value.name }}
        <br />
        {{ note.created_at }}

        <button @click="toggleEdit(note.id)">Bewerken</button>
        <div v-if="isEditing(note.id)">
            <Form
                :content="note.content"
                :ticket_id="ticket_id"
                @submit="handleNoteEdit"
            />
        </div>
        <button @click="deleteNote(note.id)">Verwijder</button>
    </li>
    {{ editingStates }}
</template>

<script setup lang="ts">
import { noteType } from "../../../services/store/storeTypes";
import { getUserById } from "../../users/store";
import { deleteNote, getNotesSorted, updateNote } from "../store";
import Form from "../components/Form.vue";
import { ref } from "vue";
const props = defineProps(["ticket_id"]);

const editingStates = ref<Record<number, boolean>>({});

const toggleEdit = (noteId: number) => {
    console.log("start editing: ", noteId);

    editingStates.value[noteId] = !editingStates.value[noteId];
};

const isEditing = (noteId: number) => {
    return !!editingStates.value[noteId];
};

const handleNoteEdit = async (data: noteType) => {
    console.log("stop editing: ", data.id);
    await updateNote(props.ticket_id, data);
    editingStates.value[data.id] = false;
};
</script>
