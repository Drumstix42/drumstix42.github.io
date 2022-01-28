<template>
    <div class="flex">
        <p-button class="p-button-info ml-auto mb-3" @click="addTab" :disabled="tabCount === maxTabCount">
            <span>Add Tab</span>
        </p-button>
    </div>
    <p-card>
        <template #content>
            <p-tab-view x-scrollable lazy v-model:activeIndex="activeTabIndex" class="overflow-x-auto">
                <p-tab-panel v-for="tab in tabs" :key="tab.id" :header="tab.title">
                    <manage-tab :tab="tab" :tab-index="tab.id"></manage-tab>
                </p-tab-panel>
            </p-tab-view>
        </template>
    </p-card>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useIcarusStore } from '@/store/icarus';

import ManageTab from '@/pages/Icarus/CraftingCalculator/ManageTab.vue';

const icarusStore = useIcarusStore();

export default {
    name: 'CraftingCalculatorTabView',
    components: {
        ManageTab,
    },
    props: [],
    data() {
        return {
            // * p-tab-view doesn't support two-way binding
            activeTabIndex: icarusStore.activeTabIndex,
            maxTabCount: 10,
        };
    },
    watch: {
        activeTabIndex: function (newValue) {
            this.setActiveTab(newValue);
        },
    },
    computed: {
        ...mapState(useIcarusStore, ['tabs', 'tabCount']),
    },
    methods: {
        ...mapActions(useIcarusStore, ['addTab', 'setActiveTab']),
    },
};
</script>

<style scope lang="scss">
.p-card-content {
    padding: 0;
}
.p-tabview-nav {
    display: flex;
    flex-wrap: wrap;

    .p-tabview-nav-link {
        margin-top: 2px !important;
    }
}
</style>
