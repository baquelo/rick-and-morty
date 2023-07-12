<script setup lang="ts">
import CharacterCard from '@/components/CharacterCard.vue';
import { useCharacterStore } from '@/stores/character';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const { getCharacters } = useCharacterStore();
const characterStore = useCharacterStore();
const { characters } = storeToRefs(characterStore);

onMounted(async () => {
    try {
        await getCharacters();
    } catch (error) {
        console.error(error);
    }
});
</script>

<template>
    <main>
        <h1 class="title">Characters</h1>
        <section class="characters">
            <CharacterCard
                v-for="character in characters"
                :key="character.id"
                :character="character"
            />
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
</style>
