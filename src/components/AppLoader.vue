<script setup lang="ts">
interface Props {
    show?: boolean;
}
withDefaults(defineProps<Props>(), { show: false });
</script>

<template>
    <div class="loader" data-cy="loader-content">
        <span v-if="show">Loading...</span>
    </div>
</template>

<style lang="scss" scoped>
.loader {
    text-align: center;
}
</style>
