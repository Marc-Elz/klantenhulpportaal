<template>
    <li v-for="note in getNotesSorted" :key="note.id">
        <p class="note">
        <div v-if="isEditing(note.id)">
            <Form
                :note="note"
                @submit="handleNoteEdit"
            />
            <button @click="toggleEdit(note.id)">Cancel</button>
        </div>
        <div v-else>
            {{ note.content }}
        </div>
        <br />
        {{ getUserById(note.user_id).value.name }}
        <br />
        {{ note.created_at }}

        <button @click="toggleEdit(note.id)">Bewerken</button>
        <button @click="deleteNote(note.id)">Verwijder</button>
        </p>
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
    editingStates.value[noteId] = !editingStates.value[noteId];
};

const isEditing = (noteId: number) => {
    return !!editingStates.value[noteId];
};

const handleNoteEdit = async (updatedNote: noteType) => {
    await updateNote(updatedNote.id, updatedNote);
    toggleEdit(updatedNote.id);
};
</script>
