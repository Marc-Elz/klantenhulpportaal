<template>
    <li v-for="note in getNotesSorted" :key="note.id">
        {{ note.content }}
        <br />
        {{ getUserById(note.user_id).value.name }}
        <br />
        {{ note.created_at }}

        <button @click="updateNote(note.id, note)">Bewerken</button>
        <button @click="deleteNote(note.id)">Verwijder</button>
    </li>
</template>

<script setup lang="ts">
import { getUserById } from "../../users/store";
import { deleteNote, getNotesSorted, updateNote } from "../store";
</script>
