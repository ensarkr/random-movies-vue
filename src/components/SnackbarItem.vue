<script setup lang="ts">
import { inject, onUnmounted } from 'vue';
import { getRandomColor } from '@/functions/randomColor';
import type { snackbarItemT } from "@/context/SnackbarProvider.vue"

const { snackbarItemData } = defineProps<{ snackbarItemData: snackbarItemT }>()

const snackbarItemDefaultColor = getRandomColor("white");

const removeSnackbarItem = inject<(id: string) => void>('removeSnackbarItem')

const timeout = setTimeout(
    () => {
        if (removeSnackbarItem !== undefined) {
            removeSnackbarItem(snackbarItemData.id)
        }
    },
    2500
);

onUnmounted(() => clearTimeout(timeout))

</script>

<template>
    <div class=snackbarItem :style="{
        border:
            '1px solid' +
            (snackbarItemData.secondaryColor === undefined
                ? snackbarItemDefaultColor
                : snackbarItemData.secondaryColor),
    }">
        {{ snackbarItemData.message }}
    </div>
</template>

<style scoped>
.snackbarItem {
    padding: 0.5rem 1rem;
    border-radius: 5px;
    background-color: black;
    color: white;
    pointer-events: auto;
}
</style>
