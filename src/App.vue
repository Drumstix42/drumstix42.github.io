<template>
    <n-config-provider :theme="darkTheme">
        <Header></Header>
        <div class="p-4">
            <router-view></router-view>
        </div>
        <n-global-style></n-global-style>
    </n-config-provider>
</template>

<script setup>
import { onMounted } from 'vue';
import Header from '@/components/header/Header.vue';
import { NConfigProvider, NGlobalStyle } from 'naive-ui';
import { darkTheme } from 'naive-ui';
import router from '@/router/router';

onMounted(() => {
    const path = localStorage.getItem('path');
    if (path) {
        localStorage.removeItem('path');
        router.push(path);
    }
});
</script>

<style lang="scss"></style>
