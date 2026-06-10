<template>
    <li v-for="comment in getCommentsSorted" :key="comment.id">
        <p class="comment">
            <div v-if="isEditing(comment.id)">
                <Form
                    :comment="comment"
                    @submit="handleCommentEdit"
                />
                <button @click="toggleEdit(comment.id)">Cancel</button>
            </div>
            <div v-else>
                {{ comment.content }}
            </div>
            <br />
            {{ getUserById(comment.user_id).value.name }}
            <br />
            {{ comment.updated_at }}

            <button @click="toggleEdit(comment.id)">Bewerken</button>
        </p>
    </li>
</template>

<script setup lang="ts">
import { getUserById } from "../../users/store";
import { getCommentsSorted, updateComment } from "../store";
import Form from "../components/Form.vue";
import { ref } from "vue";
import { commentType } from "../../../services/store/storeTypes.ts";
const props = defineProps(["ticket_id"]);

const editingStates = ref<Record<number, boolean>>({});

const toggleEdit = (commentId: number) => {
    editingStates.value[commentId] = !editingStates.value[commentId];
};

const isEditing = (commentId: number) => {
    return !!editingStates.value[commentId];
};

const handleCommentEdit = async (updatedComment: commentType) => {
    await updateComment(props.ticket_id, updatedComment);
    toggleEdit(updatedComment.id);

};
</script>
