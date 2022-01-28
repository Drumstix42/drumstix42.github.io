<template>
    <Header></Header>
    <div class="p-4">
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
    font-size: 14px;
}
</style>
