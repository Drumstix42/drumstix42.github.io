<template>
    <div class="flex p-2" :style="{ backgroundColor: 'var(--gray-700)' }">
        <div class="flex-grow-1 flex align-items-center">
            <!-- <div>{{ tabIndex }}</div> -->
            <div><input v-model.lazy="tab.title" /></div>
        </div>
        <p-button class="p-button-danger" @click="removeTab(tabIndex)">
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
        tabIndex: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {};
    },
    computed: {
        ...mapState(useIcarusStore, ['tabs']),
    },
    methods: {
        ...mapActions(useIcarusStore, ['removeTab']),
    },
};
</script>
