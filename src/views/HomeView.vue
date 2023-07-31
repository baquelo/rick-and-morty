<script setup lang="ts">
import AppLoader from '@/components/AppLoader.vue';
import CharacterCard from '@/components/CharacterCard.vue';
import ErrorBanner from '@/components/ErrorBanner.vue';
import FiltersContainer from '@/components/FiltersContainer.vue';
import PaginationContainer from '@/components/PaginationContainer.vue';
import { useCharacterStore, StatusQuery, type CharacterQuery } from '@/stores/character';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

interface Props {
    page: number;
    status?: StatusQuery;
    name?: string;
}

const props = defineProps<Props>();

const route = useRoute();
const router = useRouter();

const { getCharacters } = useCharacterStore();
const characterStore = useCharacterStore();
const { characters, info } = storeToRefs(characterStore);

const loading = ref(false);
const errorMessage = ref('');
const query = ref<CharacterQuery>({
    name: '',
    status: StatusQuery.All,
    page: 1,
});

watch(
    () => route.query,
    async () => {
        onGetCharacters(route.query);
    },
);

onMounted(async () => {
    if (route.query.name) {
        query.value.name = props.name;
    }
    if (route.query.status) {
        query.value.status = props.status;
    }
    if (route.query.page) {
        query.value.page = props.page;
    }
    await onGetCharacters(query.value);
});

const onGetCharacters = async (option?: CharacterQuery) => {
    loading.value = true;

    try {
        await getCharacters(option);
    } catch (error: any) {
        errorMessage.value = error?.response?.data?.error ?? error.message;
    }
    loading.value = false;
};

const onChange = (query: CharacterQuery) => {
    router.push({ name: 'home', query });
};
</script>

<template>
    <div>
        <header>
            <h1 class="title">Rick and Morty</h1>
        </header>
        <main class="main">
            <h2 class="title">Characters</h2>
            <FiltersContainer v-model="query" @update:modelValue="onChange" />
            <ErrorBanner :errorMessage="errorMessage" @clear="errorMessage = ''" />
            <AppLoader v-if="loading" />
            <div v-if="characters.length > 0" class="characters-wrapper">
                <div class="characters">
                    <CharacterCard
                        v-for="character in characters"
                        :key="character.id"
                        :character="character"
                    />
                </div>
                <PaginationContainer :page="page" :pages="info.pages" />
            </div>
        </main>
    </div>
</template>

<style lang="scss" scoped>
.title {
    text-align: center;
}

.main {
    display: flex;
    flex-direction: column;
    align-items: center;

    .characters-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        .characters {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }
    }
}
</style>
