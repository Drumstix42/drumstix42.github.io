<template>
    <div class="manage-tab flex align-items-center">
        <div class="flex-grow-1 flex align-items-center">
            <!-- <div>{{ tab.id }}</div> -->
            <div class="flex align-items-center">
                <span class="flex-shrink-0 mr-3">List Name:</span>
                <!-- <input v-model="tab.title" /> -->
                <n-input type="text" v-model:value.lazy="tab.title" placeholder="Name" @update:value="onTitleChanged" />
            </div>
        </div>

        <n-tooltip v-if="tabCount > 1" trigger="hover">
            <template #trigger>
                <n-button class="" secondary type="error" @click="removeTab">
                    <n-icon size="20">
                        <Times></Times>
                    </n-icon>
                </n-button>
            </template>
            Delete Tab
        </n-tooltip>
    </div>
</template>

<script>
import { mapState } from 'pinia';
import { Times } from '@vicons/fa';

import { useIcarusStore } from '@/store/icarus';

export default {
    name: 'CraftingToolManageTab',
    components: {
        Times: Times,
    },
    props: {
        tab: {
            type: Object,
            required: true,
        },
    },
    emits: ['onTitleChanged', 'removeTab'],
    data() {
        return {};
    },
    computed: {
        ...mapState(useIcarusStore, ['tabs', 'tabCount']),
    },
    methods: {
        onTitleChanged() {
            this.$emit('updateTab', { tabId: this.tab.id, title: this.tab.title });
        },
        removeTab() {
            this.$emit('removeTab', { tabId: this.tab.id });
        },
    },
};
</script>

<style scoped lang="scss">
.manage-tab {
    min-height: 3.5rem;
    padding: 0.5rem;
    background-color: var(--n-action-color);
    border-radius: 3px;
}
</style>
