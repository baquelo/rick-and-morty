<script lang="ts" setup>
import { computed } from 'vue';

import SearchCharacter from '@/components/SearchCharacter.vue';
import AppSelect from '@/components/AppSelect.vue';
import type { CharacterQuery } from '@/stores/character';

interface Props {
    modelValue: CharacterQuery;
}

const emit = defineEmits<{
    'update:modelValue': [characterQuery: CharacterQuery];
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

const statusOptions = [
    { value: 'all', label: 'All' },
    { value: 'alive', label: 'Alive' },
    { value: 'dead', label: 'Dead' },
    { value: 'unknown', label: 'Unknown' },
];
</script>

<template>
    <div class="wrapper">
        <SearchCharacter v-model="value.name" @onSearch="$emit('update:modelValue', value)" />
        <AppSelect
            :options="statusOptions"
            v-model="value.status"
            @update:modelValue="$emit('update:modelValue', value)"
        />
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    margin: 1rem 0;
    border: 1px solid white;
    border-radius: 10px;
    padding: 1rem;
    width: min(500px, 50vw);
}
</style>
