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
const props = defineProps({ note: Object });
const emit = defineEmits(["submit"]);

const form = ref({ ...props.note });

const handleSubmit = () => {
    emit("submit", form.value);
    form.value.content = "";
};
</script>
