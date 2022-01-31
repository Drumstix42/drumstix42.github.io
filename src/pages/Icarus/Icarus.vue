<template>
    <div class="icarus-wrap">
        <n-alert class="m-2 mb-4" title="Crafting Calculator" type="info" closable>
            Search and add items from the list below to add them to your to-do list, which will calculate your item requirements.
        </n-alert>
        <div class="flex flex-wrap">
            <item-selector class="item-selector"></item-selector>
            <tabs-view class="tab-view flex-1"></tabs-view>
        </div>
    </div>
</template>

<script setup>
import ItemSelector from './CraftingTool/CraftingCalculator/ItemSelector.vue';
import TabsView from './CraftingTool/TabsView.vue';
import { useIcarusStore } from '@/store/icarus';

const icarusStore = useIcarusStore();
icarusStore.loadRecipeData();
</script>

<style>
.icarus-wrap {
    max-width: 100rem;
    margin: 0 auto;
}
.tab-view {
    min-width: 20rem;
    margin: 0.5rem;
}
.item-selector {
    width: 25rem;
    margin: 0.5rem;
}
</style>
