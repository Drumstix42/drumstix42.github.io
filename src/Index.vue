<template>
    <n-config-provider :theme="darkTheme">
        <div class="p-4">
            <div>Welcome. Nothing else to see here for now.</div>
            <div>Check out the <strong>Icarus Crafting Calculator</strong> <a href="/icarus/" class="pl-1" style="color: #70c0e8">here</a>.</div>
        </div>
        <n-global-style></n-global-style>
    </n-config-provider>
</template>

<script setup>
import { NConfigProvider, NGlobalStyle } from 'naive-ui';
import { darkTheme } from 'naive-ui';


</script>

<style lang="scss"></style>
