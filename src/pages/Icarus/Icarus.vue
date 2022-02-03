<template>
    <div class="icarus-wrap">
        <n-alert class="m-2 mb-3" title="Crafting Calculator" type="info" closable>
            Search and add items from the list below to add them to your to-do list, which will calculate your item requirements.
        </n-alert>

        <div class="m-2 text-200">
            <n-text depth="3">Game version</n-text>&nbsp;
            <n-text code>1.1.1.90762</n-text>
        </div>

        <div class="flex flex-wrap">
            <item-selector class="item-selector"></item-selector>
            <tabs-view class="tab-view flex-1"></tabs-view>
        </div>

        <n-alert class="m-2 mt-4 mb-4" title="Calculator Todo List" type="default" closable>
            <template #icon>
                <n-icon size="20">
                    <Hammer></Hammer>
                </n-icon>
            </template>
            <ul>
                <li>Improve item labels vs what shows in-game</li>
                <li>Resolve item icon mis-matches</li>
                <li>Show stack size on icons that normally produce more than 1 item</li>
                <li>Save tab data in localStorage to support session restoration</li>
                <li>Implement talent options logic to impact component output calculation</li>
                <li>Improve item search matching</li>
            </ul>
        </n-alert>

        <div class="m-2">
            This page/site is not affiliated with
            <a class="text-primary" href="https://store.steampowered.com/app/1149460/ICARUS/" target="_blank">Icarus</a>,
            <a class="text-primary" href="https://rocketwerkz.com/" target="_blank">RocketWerkz</a>, or any of its subsidiaries.
        </div>
    </div>
</template>

<script setup>
import { Hammer } from '@vicons/fa';

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
