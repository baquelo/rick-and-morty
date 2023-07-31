<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    modelValue: string;
}

const emit = defineEmits<{
    onSearch: [value: string];
    'update:modelValue': [value: string];
}>();

const props = defineProps<Props>();

const value = computed({
    get() {
        return props.modelValue;
    },
    set(newValue) {
        emit('update:modelValue', newValue);
    },
});
</script>

<template>
    <form @submit.prevent="$emit('onSearch', value)" class="search-wrapper">
        <label for="search">Find by name</label>
        <input id="search" v-model="value" />
        <button>Search</button>
    </form>
</template>

<style lang="scss" scoped>
.search-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 200px;

    button,
    input {
        padding: 0.5rem;
    }
}
</style>
