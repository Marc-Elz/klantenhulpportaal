<template>
    <li v-for="comment in getCommentsSorted" :key="comment.id">
        {{ comment.content }}
        <br />
        {{ getUserById(comment.user_id).value.name }}
        <br />
        {{ comment.updated_at }}
    </li>
</template>

<script setup lang="ts">
import { getUserById } from "../../users/store";
import { getCommentsSorted } from "../store";
</script>
