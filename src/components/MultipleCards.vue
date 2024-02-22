<script setup lang="ts">
import type { cardTypesT } from '@/typings/card';
import CardSwitch from './CardSwitch.vue';
import { onUnmounted } from 'vue';
import type { CSSProperties } from 'vue';

defineProps<{ cards: cardTypesT[]; currentCardIndex: number }>()
const emit = defineEmits(['nextCard', 'previousCard', 'loadMovies'])

function getElementStyle(
    currentCardIndex: number,
    elementsIndex: number,
    borderColor: string
): CSSProperties {
    const dif = currentCardIndex - elementsIndex;
    const elementShift = 45;
    const elementTop = 15;
    const scaleRatio = 16;

    if (dif > 0) {
        return {
            userSelect: "none",
            pointerEvents: "none",
            borderColor: "black",
            zIndex: -dif * 2,
            transform: `translate3d(calc(-${elementsIndex} * var(--movie-card-width) + ${-dif * elementShift}px ), ${dif * elementTop}px, 0px) rotateZ(0deg) scale(${1 - dif / scaleRatio})`,
        };
    }

    if (dif < 0) {
        return {
            userSelect: "none",
            pointerEvents: "none",
            borderColor,
            zIndex: dif * 2 - 50,
            transform: `translate3d(calc(-${elementsIndex} * var(--movie-card-width) + ${-dif * elementShift}px ), ${-dif * elementTop}px, 0px) rotateZ(0deg) scale(${1 + dif / scaleRatio})`,
        };
    }

    return {
        borderColor,
        zIndex: 0,
        transform: `translate3d(calc(-${elementsIndex} * var(--movie-card-width) + 0px ), 0px, 0px) rotateZ(0deg) scale(1)`,
    };
}

let timer: any | null = null;
const removeTransition = () => {
    const root = document.querySelector(":root") as HTMLDivElement;
    root.style.setProperty("--movie-card-transition-duration", "0");

    if (timer) {
        clearTimeout(timer);
        timer = null;
    }

    timer = setTimeout(() => {
        root.style.setProperty("--movie-card-transition-duration", "200ms");
    }, 500);
};

let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

const checkDirection = () => {
    const swipeDetectionRangePX = 60;
    const swipeYUnDetectionRangePX = 60;

    if (Math.abs(touchendY - touchstartY) > swipeYUnDetectionRangePX) return;

    if (touchendX < touchstartX - swipeDetectionRangePX) emit("nextCard");
    if (touchendX > touchstartX + swipeDetectionRangePX) emit("previousCard");
};

const touchStart = (e: TouchEvent) => {
    touchstartX = e.changedTouches[0].screenX;
    touchstartY = e.changedTouches[0].screenY;
};
const touchEnd = (e: TouchEvent) => {
    touchendX = e.changedTouches[0].screenX;
    touchendY = e.changedTouches[0].screenY;
    checkDirection();
};


document.addEventListener("touchstart", touchStart);
document.addEventListener("touchend", touchEnd);
window.addEventListener("resize", removeTransition);

onUnmounted(() => {
    window.removeEventListener("resize", removeTransition);
    document.removeEventListener("touchstart", touchStart);
    document.removeEventListener("touchend", touchEnd);
});

</script>

<template>
    <div class=main>
        <button v-if="cards.length > 1 && currentCardIndex !== 0" class=leftButton @click="$emit('previousCard')"></button>
        <button v-if="cards.length > 1 && currentCardIndex !== cards.length - 1" class=rightButton
            @click="$emit('nextCard')"></button>

        <div class=blurBackground></div>

        <div class=backgrounds>
            <div v-for="(item, index) in cards" :key="index" class=movieDetailsWrapper
                :style="getElementStyle(currentCardIndex, index, item.color)">
                <CardSwitch :isItCurrent="index == currentCardIndex" @loadMovies="$emit('loadMovies')" :card="item">
                </CardSwitch>
            </div>


        </div>
    </div>
</template>

<style scoped>
.main {
    width: 100%;
    display: flex;
    justify-content: center;
    container-type: inline-size;
}

.backgrounds {
    position: relative;
    display: flex;
    width: var(--movie-card-width);
    box-sizing: border-box;
}

.movieDetailsWrapper {
    position: relative;
    width: var(--movie-card-width);
    transform-origin: center top;
    flex-shrink: 0;
    height: min-content;
    transition-timing-function: ease;
    transition-property: transform;
    transition-duration: var(--movie-card-transition-duration);
    will-change: transform;
    border-radius: 10px;
    box-sizing: border-box;
    border-style: solid;
    border-width: 1px;
    background-color: black;
}

.blurBackground {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    backdrop-filter: blur(5px);
}


.leftButton,
.rightButton {
    position: absolute;
    height: 100%;
    width: calc(((100cqw - var(--movie-card-width)) / 2));
    z-index: 1;
}

.leftButton {
    left: 0;
    bottom: 0;
}

.rightButton {
    right: 0;
    bottom: 0;
}

@media screen and (max-width: 1350px) {}

@media screen and (max-width: 1060px) {

    .leftButton,
    .rightButton {
        width: calc(((100cqw - var(--movie-card-width)) / 2));
    }
}

@media screen and (max-width: 650px) {

    .leftButton,
    .rightButton {
        width: calc(((100cqw - var(--movie-card-width)) / 2));
    }
}
</style>


