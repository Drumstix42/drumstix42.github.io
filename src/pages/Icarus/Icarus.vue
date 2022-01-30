<template>
    <tabs-view></tabs-view>
</template>

<script setup>
import TabsView from '@/pages/Icarus/CraftingTool/TabsView.vue';
import { useIcarusStore } from '@/store/icarus';

const icarusStore = useIcarusStore();
icarusStore.loadRecipeData();
</script>

<style></style>
