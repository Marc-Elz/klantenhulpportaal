<template>
    <ErrorMessage />
    <form @submit.prevent="handleSubmit">
        <textarea
            v-model="form.content"
            placeholder="Note on ticket"
        ></textarea>
        <FormError :name="'note'" />
        <button type="submit">Plaats note</button>
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FormError from "../../../components/FormError.vue";
import ErrorMessage from "../../../components/ErrorMessage.vue";
const props = defineProps(["ticket_id"]);
const emit = defineEmits(["submit"]);

const form = ref({ content: "", ticket_id: props.ticket_id });
const handleSubmit = () => {
    emit("submit", form.value);
    form.value.content = "";
};
</script>
