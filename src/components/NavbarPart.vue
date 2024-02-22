<script setup lang="ts">
import LogoPart from './LogoPart.vue';

</script>

<template>
    <nav class=navbar>
        <div class=content>
            <LogoPart></LogoPart>
        </div>
    </nav>
</template>

<style scoped>
.navbar {
    height: var(--navbar-height);
    padding-left: var(--content-wrapper-left-padding);
}

.content {
    width: var(--content-width);
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    box-sizing: border-box;
}


@media screen and (max-width: 1060px) {
    .content {
        padding: 0 3rem;
    }
}

@media screen and (max-width: 650px) {
    .content {
        padding: 0 1rem;
    }
}
</style>
