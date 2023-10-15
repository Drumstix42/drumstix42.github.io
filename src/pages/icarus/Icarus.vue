<template>
    <div class="icarus-wrap p-2 pt-3">
        <n-alert v-if="showWelcomeAlert" class="m-2 mb-3" title="Crafting Calculator" type="info" closable @after-leave="dismissAlert('welcome')">
            Search and add items from the list below to add them to your to-do list, which will calculate your item requirements.
        </n-alert>

        <n-alert v-if="showWhatsNewAlert" class="m-2 mb-3" title="What's New?" type="success" closable @after-leave="dismissAlert('whatsNew')">
            <ul class="mb-0 pl-0 list-none">
                <li class="mb-1">
                    Support for
                    <a class="text-primary font-bold" href="https://store.steampowered.com/news/app/1149460/view/3749867242860597507" target="_blank">
                        Icarus Week 96 Update
                    </a>
                </li>
                <li class="mb-1">
                    🔄 All your Tabs and Toggle options now persist between sessions. Data saves to
                    <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" target="_blank" class="text-primary"
                        >localStorage</a
                    >.
                </li>
                <li class="mb-1">🔍 Fuzzy search added to Item Search list. It should be a little easier to find items.</li>
                <li class="mb-1">🔨 "Stack" count displays on icons for Items which are crafted in bulk (<em>e.g. x100 Steel Screw</em>)</li>
            </ul>
        </n-alert>

        <div class="flex flex-wrap">
            <div>
                <item-search-view class="item-selector"></item-search-view>
                <div class="m-2 text-200 flex align-items-center">
                    <n-text depth="3" class="flex-shrink-0">Supports game version</n-text>
                    <div class="game-version">
                        <n-input :value="'v2.1.0.116866'" readonly></n-input>
                    </div>
                    <n-text depth="3">2023/10/13</n-text>
                </div>
            </div>
            <tabs-view class="tab-view flex-1"></tabs-view>
        </div>

        <n-alert class="m-2 mt-3 mb-4" title="Developer Todo List" type="default" closable>
            <template #icon>
                <n-icon size="20">
                    <Hammer></Hammer>
                </n-icon>
            </template>
            <ul>
                <li class="line-through">Save tab data in localStorage to support session restoration</li>
                <li class="line-through">Show stack size on icons that normally produce more than 1 item</li>
                <li class="line-through">Improve item search matching (fuzzy search)</li>
                <li>Add way to "check" off items (mark as done)</li>
                <li>Implement talent options logic to impact component output calculation</li>
                <li>Indicate which items belong to each Tier (not specified in game data export directly)</li>
            </ul>
        </n-alert>

        <div class="m-2">
            <div>Created by <a class="text-primary font-bold" href="https://github.com/Drumstix42/drumstix42.github.io">Drumstix42</a></div>
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
    whatsNew: 20231013,
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

<style lang="scss">
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
.game-version {
    width: 8rem;
    text-align: center;
    margin: 0 1rem;
}
</style>
