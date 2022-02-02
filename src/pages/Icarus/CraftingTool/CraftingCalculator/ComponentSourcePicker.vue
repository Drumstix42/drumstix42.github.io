<template>
    <template v-if="recipeData[componentName]">
        <n-button-group size="small">
            <template v-for="(craftingStationName, index) in recipeData[componentName].sources" :key="craftingStationName">
                <n-button
                    class="mx-1"
                    size="tiny"
                    ghost
                    round
                    type="info"
                    :style="[
                        recipeData[componentName].preferredSource === craftingStationName
                            ? null
                            : '--n-border: 1px solid rgba(255, 255, 255, 0.2); --n-text-color: #bbb',
                    ]"
                    @click="setComponentPreferredSource(componentName, craftingStationName)"
                >
                    <span v-if="recipeData[craftingStationName]">{{ recipeData[craftingStationName].label }}</span>
                    <span v-else>{{ craftingStationName }}</span>
                </n-button>
            </template>
        </n-button-group>
    </template>
</template>

<script>
import { mapState } from 'pinia';
import { useIcarusStore } from '@/store/icarus';

export default {
    name: 'CraftingToolComponentSourcePicker',
    components: {},
    props: {
        componentName: {
            type: String,
            required: true,
        },
    },
    data() {
        return {};
    },
    computed: {
        ...mapState(useIcarusStore, ['recipeData']),
    },
    methods: {
        setComponentPreferredSource(componentName, craftingStationName) {
            this.recipeData[componentName].preferredSource = craftingStationName;
            this.$emit('update');
        },
    },
};
</script>

<style scope lang="scss">
.n-button-group:not(.n-button-group--vertical) .n-button.n-button--ghost.n-button--info-type + .n-button.n-button--info-type .n-button__border {
    border-left-width: 1px !important;
}
</style>
