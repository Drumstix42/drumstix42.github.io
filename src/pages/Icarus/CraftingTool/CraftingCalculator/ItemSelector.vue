<template>
    <div>
        <Multiselect class="multiselect-dark" v-model="value" :options="options" searchable placeholder="Select a recipe">
            <!-- <template v-slot:singlelabel="{ value }">
                <div class="multiselect-single-label"><img class="character-label-icon" :src="value.icon" /> {{ value.label }}</div>
            </template> -->

            <template v-slot:option="{ option }">
                <!-- <n-image
                    width="30"
                    :src="`/Icarus/ItemIcons/ITEM_${option.value}.png`"
                    fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                    preview-disabled="true"
                /> -->

                <img class="character-option-icon" :src="option.image.src" width="30" />
                {{ option.label }}
            </template>
        </Multiselect>
    </div>
</template>

<script>
import Multiselect from '@vueform/multiselect';
import { mapState } from 'pinia';
import { Search } from '@vicons/fa';

import { recipeOptions, useIcarusStore } from '@/store/icarus';

export default {
    name: 'CraftingToolItemSelector',
    components: {
        Multiselect,
        Search,
    },
    props: {},
    data() {
        return {
            isOpen: false,
            value: null,
            options: recipeOptions,
        };
    },
    computed: {
        ...mapState(useIcarusStore, ['isLoadingRecipeData']),
    },
    watch: {
        isLoadingRecipeData() {
            this.options = recipeOptions;
        },
    },
    methods: {},
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
