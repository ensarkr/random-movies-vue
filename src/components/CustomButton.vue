<script setup lang="ts">

defineProps<{ title: string; secondaryColor: string }>()

</script>

<template>
    <button class=main @click="$emit('onClick')" :style="{ backgroundColor: secondaryColor }">
        {{ title }}
    </button>
</template>

<style scoped>
.main {
    margin: 0;
    padding: 0;
    border: none;
    background: none;
    font: inherit;
    color: inherit;
    line-height: normal;
    cursor: pointer;

    color: white;
    height: 3rem;
    width: 100%;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid rgb(0, 0, 0, 0.12);
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
