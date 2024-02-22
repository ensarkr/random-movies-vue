<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import MultipleCards from "./MultipleCards.vue";
import type { cardTypesT } from "../typings/card";
import { getRandomColor } from "../functions/randomColor";
import { requestTenRandomMovie } from "../functions/requests"
import type { snackbarItemT } from "@/context/SnackbarProvider.vue";

const cards = ref<cardTypesT[]>([])
const currentCardIndex = ref<number>(0)
const fetchStatus = ref<"loading" | "error" | "functional">("loading")

const addSnackbarItem = inject<(item: Pick<snackbarItemT, "message" | "secondaryColor">) => void>("addSnackbarItem")

const fetchAndSetMovies = async () => {
    currentCardIndex.value = 0;

    fetchStatus.value = "loading";

    const res = await requestTenRandomMovie();

    if (!res.status) {
        fetchStatus.value = "error";

        if (addSnackbarItem !== undefined)
            addSnackbarItem({
                message: res.message,
            })

        return
    }

    fetchStatus.value = "functional";
    cards.value = [
        ...res.value.map((e) => {
            return { ...e, color: getRandomColor("white"), status: "loaded" };
        }),
        {
            status: "loadMore",
            color: getRandomColor("white"),
        },
    ] as cardTypesT[]

};

const nextCard = () => {
    if (currentCardIndex.value + 1 <= cards.value.length - 1) {
        currentCardIndex.value++
    };
};

const previousCard = () => {
    if (currentCardIndex.value - 1 >= 0) currentCardIndex.value--;
};

onMounted(() => {
    fetchAndSetMovies()
})

</script>

<template>
    <main>
        <MultipleCards @nextCard="nextCard" @previousCard="previousCard" @loadMovies="fetchAndSetMovies"
            :currentCardIndex="currentCardIndex"
            :cards="fetchStatus === 'error' ? [{ status: 'retry', color: getRandomColor('white') }] : fetchStatus === 'loading' ? [{ status: 'loadingMovies', color: getRandomColor('white') }] : cards">
        </MultipleCards>
    </main>
</template>

<style scoped></style>
