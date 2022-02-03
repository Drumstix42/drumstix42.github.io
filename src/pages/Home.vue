<template>
    <div>Welcome. Nothing else to see here for now.</div>
    <div>
        Check out the <strong>Icarus Crafting Calculator</strong>
        <router-link :to="{ name: RouteName.ICARUS }" class="pl-1" style="color: #70c0e8">here</router-link>.
    </div>
</template>

<script setup>
import { RouteName } from '@/constants/router';
</script>

<style></style>
