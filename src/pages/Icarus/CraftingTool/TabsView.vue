<template>
    <div class="flex align-items-center mb-3">
        <div class="flex align-items-center ml-auto">
            <div class="mr-3">{{ tabCount }} / {{ maxTabCount }}</div>
            <n-button class="" strong secondary type="primary" @click="addTab" :disabled="tabCount === maxTabCount">
                <span>Add Tab</span>
            </n-button>
        </div>
    </div>
    <n-card>
        {{ activeTabId }} - {{ activeTab?.id }}
        <n-tabs
            ref="tabsInstRef"
            v-model:value="activeTabId"
            type="bar"
            :addable="addable"
            :closable="closable"
            @close="handleClose"
            @add="handleAdd"
            tab-style=""
        >
            <!-- `name` acts as ID here -->
            <n-tab-pane v-for="tab in tabs" :tab="tab.title" :name="tab.id" :key="tab.id">
                <manage-tab :tab="tab" @remove-tab="removeTab"></manage-tab>
                <crafting-calculator class="mt-4" :tab="tab"></crafting-calculator>
            </n-tab-pane>
            <!-- <template #prefix>Prefix</template>
            <template #suffix>Suffix</template> -->
        </n-tabs>
    </n-card>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useIcarusStore } from '@/store/icarus';

import ManageTab from '@/pages/Icarus/CraftingTool/ManageTab.vue';
import CraftingCalculator from '@/pages/Icarus/CraftingTool/CraftingCalculator/CraftingCalculator.vue';

const icarusStore = useIcarusStore();

export default {
    name: 'CraftingToolTabView',
    components: {
        ManageTab,
        CraftingCalculator,
    },
    props: [],
    data() {
        return {
            // * p-tab-view doesn't support two-way binding
            activeTabId: icarusStore.activeTabId,
            maxTabCount: 20,

            addable: true,
            closable: true,
        };
    },
    watch: {
        activeTabId: function (newValue) {
            this.setActiveTab(newValue);
        },
    },
    computed: {
        ...mapState(useIcarusStore, ['tabs', 'tabCount', 'activeTab']),
    },
    methods: {
        ...mapActions(useIcarusStore, ['addTab', 'setActiveTab']),
        handleAdd() {},
        handleClose() {},
        removeTab({ tabId } = {}) {
            // update store
            icarusStore.removeTab(tabId);
            // update component from store
            this.activeTabId = icarusStore.activeTabId;
            // fix tab underline position
            this.$nextTick(() => {
                this.$refs.tabsInstRef?.syncBarPosition();
            });
        },
    },
};
</script>

<style scope lang="scss"></style>
