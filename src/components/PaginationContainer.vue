<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
    page: {
        type: Number,
        required: true,
    },
});

const previousPage = computed(() => {
    return props.page - 1;
});
const nextPage = computed(() => {
    return props.page + 1;
});
</script>

<template>
    <nav class="pagination">
        <router-link class="link" :to="{ name: 'home', query: { page: previousPage } }"
            >Previous</router-link
        >
        <router-link class="link" :to="{ name: 'home', query: { page: nextPage } }"
            >Next</router-link
        >
    </nav>
</template>

<style lang="scss" scoped>
.pagination {
    width: 200px;
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;

    .link {
        text-decoration: none;
        font-weight: 700;
        color: #ffffff;
    }
}
</style>
