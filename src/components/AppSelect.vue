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

defineEmits<{
    'update:modelValue': [value: string];
}>();

defineProps<Props>();
</script>

<template>
    <div class="filter-wrapper">
        <label for="filter" data-cy="select-label">{{ label }}</label>
        <select
            :value="modelValue"
            id="filter"
            v-bind="{
                onChange: ($event) => {
                    $emit('update:modelValue', $event.target.value);
                },
            }"
            data-cy="select-input"
        >
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
