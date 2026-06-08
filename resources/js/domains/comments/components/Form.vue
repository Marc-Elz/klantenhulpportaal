<template>
    <ErrorMessage />
    <form @submit.prevent="handleSubmit">
        <textarea
            v-model="form.content"
            placeholder="Comment on ticket"
        ></textarea>
        <FormError :name="'comment'" />
        <button type="submit">Plaats comment</button>
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FormError from "../../../components/FormError.vue";
import ErrorMessage from "../../../components/ErrorMessage.vue";
const props = defineProps(["ticket_id"]);
const emit = defineEmits(["submit"]);
const form = ref({ content: "", ticket_id: props.ticket_id });
const handleSubmit = () => emit("submit", form.value);
</script>
