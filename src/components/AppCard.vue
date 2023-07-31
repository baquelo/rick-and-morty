<script setup lang="ts">
interface Props {
    image?: string;
    altImage?: string;
}

withDefaults(defineProps<Props>(), {
    altImage: 'Image',
});
</script>

<template>
    <div class="card">
        <img v-if="image" :src="image" :alt="altImage" data-cy="card-image" />
        <div class="body" data-cy="card-body">
            <slot></slot>
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
