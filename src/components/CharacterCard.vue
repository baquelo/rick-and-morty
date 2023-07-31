<script lang="ts" setup>
import { Status, type Character } from '@/stores/character';
import { toRefs, computed } from 'vue';
import AppCard from './AppCard.vue';

interface Props {
    character: Character;
}

const props = defineProps<Props>();

const { character } = toRefs(props);

const statusColor = computed(() => {
    switch (character.value.status) {
        case Status.Alive:
            return 'green';
        case Status.Dead:
            return 'red';
        default:
            return 'gray';
    }
});
</script>

<template>
    <AppCard :image="character.image" :alt="character.name">
        <div class="name">
            {{ character.name }}
        </div>
        <div>
            <label>
                <svg width="10px" height="10px">
                    <circle cx="5" cy="5" r="5" :fill="statusColor" />
                </svg>
            </label>
            {{ character.status }}
        </div>
        <div>
            <label class="label">Last known location:</label>
            {{ character.location.name }}
        </div>
        <div>
            <label class="label">First seen in:</label>
            {{ character.origin.name }}
        </div>
    </AppCard>
</template>

<style lang="scss" scoped>
.name {
    font-size: 1.5rem;
    font-weight: bold;
}
div {
    margin: 10px 0;
}
.label {
    display: block;
    font-weight: 100;
}
</style>
