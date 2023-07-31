<script setup lang="ts">
interface Props {
    errorMessage: string;
}

defineEmits<{
    clear: [void];
}>();

defineProps<Props>();
</script>

<template>
    <div class="error-message" v-if="errorMessage">
        <span>Error:</span> {{ errorMessage }}
        <p>
            <router-link to="/" @click="$emit('clear')">Go to home</router-link>
        </p>
    </div>
</template>

<style lang="scss" scoped>
.error-message {
    color: red;
    background-color: yellow;
    padding: 30px;
    max-width: 300px;
    text-align: center;

    span {
        font-weight: bold;
    }
}
</style>
