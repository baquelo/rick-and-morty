<script setup lang="ts">
interface Option {
    value: string;
    label: string;
}

interface Props {
    modelValue: string;
    options: Option[];
    label: string;
}

const emit = defineEmits<{
    'update:modelValue': [value: string];
}>();

defineProps<Props>();

const onChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    emit('update:modelValue', target.value);
};
</script>

<template>
    <div class="filter-wrapper">
        <label for="filter" data-cy="select-label">{{ label }}</label>
        <select :value="modelValue" id="filter" @change="onChange" data-cy="select-input">
            <option v-for="{ value, label } in options" :key="value" :value="value">
                {{ label }}
            </option>
        </select>
    </div>
</template>

<style lang="scss" scoped>
.filter-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 200px;

    select {
        padding: 0.5rem;
    }
}
</style>
