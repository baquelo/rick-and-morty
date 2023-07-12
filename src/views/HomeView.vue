<script setup lang="ts">
import CharacterCard from '@/components/CharacterCard.vue';
import { useCharacterStore } from '@/stores/character';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const { getCharacters } = useCharacterStore();
const characterStore = useCharacterStore();
const { characters } = storeToRefs(characterStore);

const loading = ref(false);
const errorMessage = ref('');

onMounted(async () => {
    onGetCharacters();
});

async function onGetCharacters() {
    loading.value = true;
    try {
        await getCharacters(page.value);
    } catch (error: any) {
        console.error('errorman', error);
        errorMessage.value = error.message;
    }
    loading.value = false;
}

const page = computed(() => {
    return route.query.page ? Number(route.query.page) : 1;
});
const previousPage = computed(() => {
    return page.value - 1;
});
const nextPage = computed(() => {
    return page.value + 1;
});

watch(
    () => route.query.page,
    async () => {
        onGetCharacters();
    },
);
</script>

<template>
    <main>
        <h1 class="title">Characters</h1>
        <div class="error-message" v-if="errorMessage"><span>Error:</span> {{ errorMessage }}</div>
        <div v-if="loading">Loading...</div>
        <section v-if="characters.length > 0" class="characters">
            <CharacterCard
                v-for="character in characters"
                :key="character.id"
                :character="character"
            />
            <nav>
                <router-link :to="{ name: 'home', query: { page: previousPage } }"
                    >Previous</router-link
                >
                <router-link :to="{ name: 'home', query: { page: nextPage } }">Next</router-link>
            </nav>
        </section>
    </main>
</template>

<style lang="scss" scoped>
.title {
    text-align: center;
}
.characters {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

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
