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
import Header from '@/components/header/Header.vue';
import { NConfigProvider, NGlobalStyle } from 'naive-ui';
import { darkTheme } from 'naive-ui';
</script>

<style lang="scss"></style>
