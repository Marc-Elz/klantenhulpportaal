<template>
    <li v-for="comment in getCommentsSorted" :key="comment.id">
        {{ comment.content }}
        <br />
        {{ getUserById(comment.user_id).value.name }}
        <br />
        {{ comment.updated_at }}

        <button @click="editing = !editing">Bewerken</button>
        <div v-if="editing">
            <Form
                :content="comment.content"
                :ticket_id="ticket_id"
                @submit="handleCommentEdit"
            />
        </div>
    </li>
</template>

<script setup lang="ts">
import { getUserById } from "../../users/store";
import { getCommentsSorted, updateComment } from "../store";
import Form from "../components/Form.vue";
import { ref } from "vue";
import { commentType } from "../../../services/store/storeTypes.ts";
const props = defineProps(["ticket_id"]);

let editing = ref(false);

const handleCommentEdit = async (data: commentType) => {
    await updateComment(props.ticket_id, data);
};
</script>
