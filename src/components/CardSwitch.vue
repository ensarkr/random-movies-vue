<script setup lang="ts">
import type { cardTypesT } from '@/typings/card';
import MovieCard from './MovieCard.vue';
import CircleLoader from './CircleLoader.vue';
import CustomButton from './CustomButton.vue';

defineProps<{ isItCurrent: boolean; card: cardTypesT }>()
defineEmits(['loadMovies'])


</script>

<template>
    <MovieCard v-if="card.status === 'loaded'" :isItCurrent="isItCurrent" :movieDetails="card" :key="card.id"></MovieCard>

    <div v-else-if="card.status === 'retry'" class="main centeredCard">
        <div class=centeredDiv>
            <h2>ヽ(ﾟДﾟ)ﾉ</h2>
            <h3>Error occurred.</h3>
            <CustomButton @onClick="$emit('loadMovies')" :secondaryColor="card.color" title="RETRY">
            </CustomButton>
        </div>
    </div>

    <div v-else-if="card.status === 'loadingMovies'" class="main centeredCard">
        <div class=centeredDiv>
            <h2>∩(´∀`∩)</h2>
            <h3>Loading the best movies for you.</h3>
            <CircleLoader :color="card.color" height="2rem">
            </CircleLoader>
        </div>
    </div>

    <div v-else-if="card.status === 'loadMore'" class="main centeredCard">
        <div class=centeredDiv>
            <h2>＼（^０＾）／</h2>
            <h3>You have looked every movie.</h3>
            <CustomButton @onClick="$emit('loadMovies')" :secondaryColor="card.color" title="LOAD MORE">
            </CustomButton>
        </div>
    </div>
</template>

<style scoped>
.main {
    box-sizing: border-box;
    padding: 15px;
    overflow: hidden;
}

.centeredCard {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: calc(var(--min-content-height) - 3rem);
}

.centeredDiv {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    text-align: center;
}

.centeredDiv button {
    width: 200px;
}

.centeredDiv h2,
.centeredDiv h3 {
    margin: 0;
}

</style>
