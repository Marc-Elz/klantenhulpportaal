<template>
    <ErrorMessage />
    <form @submit.prevent="handleSubmit">
        <textarea v-model="form.content" placeholder="Write note"></textarea>
        <FormError :name="'note'" />
        <button type="submit">Submit</button>
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FormError from "../../../components/FormError.vue";
import ErrorMessage from "../../../components/ErrorMessage.vue";
const props = defineProps(["ticket_id", "content"]); // Moet {note: Object} voor update hebben? maar voor create is het voldoende
const emit = defineEmits(["submit"]);

const form = ref({ content: props.content || "", ticket_id: props.ticket_id });
const handleSubmit = () => {
    emit("submit", form.value);
    form.value.content = "";
};
</script>
