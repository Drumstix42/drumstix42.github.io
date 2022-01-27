<template>
    <Header></Header>
    <div class="w-full h-full flex flex-column align-items-center justify-content-center">
        <router-view></router-view>
    </div>
</template>

<script setup>
import Header from '@/components/header/Header.vue';
</script>

<style>
body {
    color: var(--text-color);
    font-family: var(--font-family);
}
</style>
