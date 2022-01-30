<template>
    <div class="manage-tab flex align-items-center p-2">
        <div class="flex-grow-1 flex align-items-center">
            <!-- <div>{{ tab.id }}</div> -->
            <div><input v-model="tab.title" /></div>
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
    emits: ['removeTab'],
    data() {
        return {};
    },
    computed: {
        ...mapState(useIcarusStore, ['tabs', 'tabCount']),
    },
    methods: {
        //...mapActions(useIcarusStore, ['removeTab']),
        removeTab() {
            this.$emit('removeTab', { tabId: this.tab.id });
        },
    },
};
</script>

<style scoped lang="scss">
.manage-tab {
    min-height: 3.5rem;
    background-color: var(--n-action-color);
}
</style>
