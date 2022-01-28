<template>
    <div class="manage-tab flex p-2" :style="{ backgroundColor: 'var(--gray-700)' }">
        <div class="flex-grow-1 flex align-items-center">
            <!-- <div>{{ tab.id }}</div> -->
            <div><input v-model.lazy="tab.title" /></div>
        </div>
        <p-button v-if="tabCount > 1" class="p-button-danger" @click="removeTab(tab.id)">
            <span class="pi pi-times"></span>
        </p-button>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useIcarusStore } from '@/store/icarus';

export default {
    name: 'CraftingToolManageTab',
    components: {},
    props: {
        tab: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {};
    },
    computed: {
        ...mapState(useIcarusStore, ['tabs', 'tabCount']),
    },
    methods: {
        ...mapActions(useIcarusStore, ['removeTab']),
    },
};
</script>

<style scoped lang="scss">
.manage-tab {
    min-height: 3.5rem;
}
</style>
