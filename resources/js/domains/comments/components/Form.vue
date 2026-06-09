<template>
    <ErrorMessage />
    <form @submit.prevent="handleSubmit">
        <textarea
            v-model="form.content"
            placeholder="Comment on ticket"
        ></textarea>
        <FormError :name="'comment'" />
        <button type="submit">Submit</button>
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FormError from "../../../components/FormError.vue";
import ErrorMessage from "../../../components/ErrorMessage.vue";
const props = defineProps(["ticket_id", "content"]);
const emit = defineEmits(["submit"]);

const form = ref({ content: props.content || "", ticket_id: props.ticket_id });
const handleSubmit = () => {
    emit("submit", form.value);
    form.value.content = "";
};
</script>
