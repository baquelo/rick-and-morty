<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

interface Props {
    page: number;
    pages: number;
}

const props = defineProps<Props>();

const previousPage = computed(() => {
    return props.page - 1;
});
const nextPage = computed(() => {
    return props.page + 1;
});
</script>

<template>
    <nav class="pagination">
        <router-link
            v-if="previousPage > 0"
            class="link"
            :to="{ name: 'home', query: { ...route.query, page: previousPage } }"
        >
            Previous
        </router-link>
        <router-link
            v-if="nextPage <= pages"
            class="link"
            :to="{ name: 'home', query: { ...route.query, page: nextPage } }"
        >
            Next
        </router-link>
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
