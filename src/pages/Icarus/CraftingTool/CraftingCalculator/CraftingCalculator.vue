<template>
    <div>
        <item-selector></item-selector>
    </div>
</template>

<script>
import ItemSelector from './ItemSelector.vue';

export default {
    name: 'CraftingToolCalculator',
    components: {
        ItemSelector,
    },
    props: {
        tab: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {};
    },
    computed: {},
    methods: {},
};
</script>
