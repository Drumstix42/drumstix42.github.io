<template>
    <template v-if="recipeData[componentId]">
        <n-button-group size="small">
            <template v-for="(craftingStationName, index) in recipeData[componentId].sources" :key="craftingStationName">
                <n-button
                    class="mx-1"
                    size="tiny"
                    ghost
                    type="info"
                    :style="[
                        recipeData[componentId].preferredSource === craftingStationName
                            ? null
                            : '--n-border: 1px solid rgba(255, 255, 255, 0.2); --n-text-color: #bbb',
                    ]"
                    @click="setComponentPreferredSource(componentId, craftingStationName)"
                >
                    <span>{{ recipeData[craftingStationName]?.label ?? itemLabelMap[craftingStationName] ?? craftingStationName }}</span>
                </n-button>
            </template>
        </n-button-group>
    </template>
</template>

<script>
import { mapState } from 'pinia';
import { useIcarusStore } from '@/store/icarus';
import { itemLabelMap } from '@/utility/icarusData';

export default {
    name: 'CraftingToolComponentSourcePicker',
    components: {},
    props: {
        componentId: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            itemLabelMap: itemLabelMap,
        };
    },
    computed: {
        ...mapState(useIcarusStore, ['recipeData']),
    },
    methods: {
        setComponentPreferredSource(componentId, craftingStationName) {
            this.recipeData[componentId].preferredSource = craftingStationName;
            this.$emit('change');
        },
    },
};
</script>

<style scope lang="scss">
.n-button-group:not(.n-button-group--vertical) .n-button.n-button--ghost.n-button--info-type + .n-button.n-button--info-type .n-button__border {
    border-left-width: 1px !important;
}
</style>
