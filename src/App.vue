<script setup lang="ts">
import NavbarPart from './components/NavbarPart.vue';
import MainPart from './components/MainPart.vue';
import FooterPart from './components/FooterPart.vue';
import SnackbarProvider from './context/SnackbarProvider.vue';
</script>

<template>
  <SnackbarProvider>
    <NavbarPart></NavbarPart>
    <MainPart></MainPart>
    <FooterPart></FooterPart>
  </SnackbarProvider>
</template>

<style scoped></style>
