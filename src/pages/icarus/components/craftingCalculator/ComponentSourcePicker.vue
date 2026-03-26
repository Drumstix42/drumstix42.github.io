<template>
    <template v-if="componentRecipe">
        <n-button-group size="small">
            <template v-for="(craftingStationName, index) in componentRecipe.sources" :key="craftingStationName">
                <n-button
                    class="mx-1"
                    size="tiny"
                    ghost
                    type="info"
                    :style="[
                        componentRecipe.preferredSource === craftingStationName
                            ? '--n-border: 1px solid #364266'
                            : '--n-border: 1px solid rgba(255, 255, 255, 0.1); --n-text-color: #bbb',
                    ]"
                    @click="setComponentPreferredSource(componentRecipe.id, craftingStationName)"
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
        componentRecipe() {
            return (
                this.recipeData[this.componentId] ??
                Object.values(this.recipeData).find((recipe) => recipe.outputItemId === this.componentId || recipe.itemStaticId === this.componentId)
            );
        },
    },
    methods: {
        setComponentPreferredSource(recipeId, craftingStationName) {
            this.recipeData[recipeId].preferredSource = craftingStationName;
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
