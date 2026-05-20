<template>
    <div :class="'error-style'">
        {{ displayMessage }}
    </div>
</template>

<script setup lang="ts">
import { getMessage } from "../services/error";

const displayMessage = getMessage;
</script>
