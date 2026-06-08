<template>
    (Comments made by admins visible for submitter) (If user is admin show
    comment box for creating comment)
    <li v-for="comment in getAllComments" :key="comment.id">
        {{ comment }}
    </li>
</template>

<script setup lang="ts">
import { getAllComments } from "../store";
</script>
