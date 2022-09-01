<template>
    <div class="icarus-wrap p-2 pt-3">
        <n-alert v-if="showWelcomeAlert" class="m-2 mb-3" title="Crafting Calculator" type="info" closable @after-leave="dismissAlert('welcome')">
            Search and add items from the list below to add them to your to-do list, which will calculate your item requirements.
        </n-alert>

        <n-alert v-if="showWhatsNewAlert" class="m-2 mb-3" title="What's New?" type="success" closable @after-leave="dismissAlert('whatsNew')">
            <ul class="mb-0">
                <li>The "Jerrycan" item is now labeled "Biofuel Can" to match the in-game display name.</li>
            </ul>
        </n-alert>

        <div class="flex flex-wrap">
            <div>
                <item-search-view class="item-selector"></item-search-view>
                <div class="m-2 text-200">
                    <n-text depth="3">Supports game version</n-text>&nbsp;
                    <n-text code>1.2.13.100500 - 2022/08/26</n-text>
                </div>
            </div>
            <tabs-view class="tab-view flex-1"></tabs-view>
        </div>

        <n-alert class="m-2 mt-3 mb-4" title="Calculator Todo List" type="default" closable>
            <template #icon>
                <n-icon size="20">
                    <Hammer></Hammer>
                </n-icon>
            </template>
            <ul>
                <li>Improve any mismatching item labels vs what shows in-game (labels from game data export are not perfect, and must be mapped manually)</li>
                <li>Resolve remaining item icon mis-matches (game data export doesn't match image export)</li>
                <li>Save tab data in localStorage to support session restoration</li>
                <li>Show stack size on icons that normally produce more than 1 item</li>
                <li>Implement talent options logic to impact component output calculation</li>
                <li>Indicate which items belong to each Tier (not specified in game data export directly)</li>
                <li>Improve item search matching (scrubby search)</li>
                <li>Add way to "check" off items (mark as done)</li>
            </ul>
        </n-alert>

        <div class="m-2">
            <div>Created by <a href="https://github.com/Drumstix42/drumstix42.github.io">Drumstix42.</a></div>
            <div>
                This page/site is not affiliated with
                <a class="text-primary" href="https://store.steampowered.com/app/1149460/ICARUS/" target="_blank">Icarus</a>,
                <a class="text-primary" href="https://rocketwerkz.com/" target="_blank">RocketWerkz</a>, or any of its subsidiaries.
            </div>
        </div>
    </div>
</template>

<script>
import { Hammer } from '@vicons/fa';

import ItemSearchView from '@/pages/icarus/components/craftingCalculator/ItemSearchView.vue';
import TabsView from '@/pages/icarus/components/TabsView.vue';
import { useIcarusStore } from '@/store/icarus';

const icarusStore = useIcarusStore();
icarusStore.loadRecipeData();

const AlertVersion = Object.freeze({
    welcome: 1,
    whatsNew: 1,
});

const isAlertVisible = (alertName) => {
    const alertVersion = localStorage.getItem(`alert:version:${alertName}`);
    return !alertVersion || Number(alertVersion) < AlertVersion[alertName];
};

export default {
    name: 'Icarus',
    components: {
        Hammer,
        ItemSearchView,
        TabsView,
    },
    props: [],
    data() {
        return {
            showWelcomeAlert: isAlertVisible('welcome'),
            showWhatsNewAlert: isAlertVisible('whatsNew'),
        };
    },
    computed: {},
    methods: {
        dismissAlert(alertName) {
            alertName && AlertVersion[alertName] && localStorage.setItem(`alert:version:${alertName}`, AlertVersion[alertName]);
        },
    },
};
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
