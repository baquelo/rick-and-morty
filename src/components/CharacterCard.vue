<script lang="ts" setup>
import { Status, type Character } from '@/stores/character';
import { toRefs, computed } from 'vue';

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
    <div class="card">
        <img :src="character.image" :alt="character.name" />
        <div class="body">
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
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card {
    /* border: 1px solid white; */
    background-color: #1f1f1f;
    border-radius: 10px;
    width: 300px;
    padding: 0;
    margin: 10px;
    color: white;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.75);

    img {
        width: 100%;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    .body {
        padding: 10px;

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
    }
}
</style>
