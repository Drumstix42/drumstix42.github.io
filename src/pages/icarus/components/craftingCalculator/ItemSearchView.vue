<template>
    <div>
        <div class="mb-3 flex align-items-center">
            <n-input type="text" v-model:value="searchValue" placeholder="Search..." clearable @input="onSearch" />
            <div class="flex-shrink-0 ml-3">
                <n-tooltip trigger="hover" placement="right">
                    <template #trigger>
                        <n-checkbox v-model:checked="settings.searchFuzzyMatch">Fuzzy search</n-checkbox>
                    </template>
                    Allows partial text matches, sorted by match quality
                </n-tooltip>
            </div>
        </div>
        <n-spin :show="isLoadingRecipes">
            <n-card class="scroll-wrap" content-style="padding: 0;">
                <div v-if="filteredRecipeOptions.length === 0" class="p-3 font-italic">No matching items found.</div>

                <RecycleScroller class="scroller" :items="filteredRecipeOptions" :item-size="40" key-field="id" v-slot="{ index, item }">
                    <div class="recipe-item flex align-items-center" @click="addItem(item.id)">
                        <div class="relative flex align-items-center">
                            <n-image
                                class="icon"
                                width="32"
                                :src="`/icarus-game/ItemIcons/${item.iconPath}.png`"
                                fallback-src="/icarus-game/Images/question-mark.png"
                                :preview-disabled="true"
                            >
                                <template #default> test </template>
                            </n-image>
                            <div v-if="recipeData[item.id]?.outputQuantity > 1" class="item-counter">x{{ recipeData[item.id].outputQuantity }}</div>
                        </div>
                        <div class="flex-shrink" style="min-width: 0">
                            <div class="label text-overflow-ellipsis" v-bind:item-id="item.id">{{ item.label }}</div>
                        </div>
                        <n-tooltip trigger="hover">
                            <template #trigger>
                                <n-button class="hover-button ml-auto" secondary type="default" size="small">
                                    <n-icon size="13">
                                        <Plus></Plus>
                                    </n-icon>
                                </n-button>
                            </template>
                            Add to list
                        </n-tooltip>
                    </div>
                </RecycleScroller>
            </n-card>
        </n-spin>
    </div>
</template>

<script>
import { debounce } from 'debounce';
import { mapActions, mapState } from 'pinia';
import { Plus } from '@vicons/fa';

import { useIcarusStore } from '@/store/icarus';
const icarusStore = useIcarusStore();

export default {
    name: 'CraftingToolItemSelector',
    components: {
        Plus,
    },
    props: {},
    data() {
        return {
            searchValue: null,
        };
    },
    computed: {
        ...mapState(useIcarusStore, ['recipeData', 'isLoadingRecipes', 'filteredRecipeOptions', 'settings']),
    },
    methods: {
        ...mapActions(useIcarusStore, ['addItem']),
        onSearch: debounce((value) => {
            icarusStore.recipeSearch = value;
        }, 250),
    },
};
</script>

<style scoped lang="scss">
.scroll-wrap {
    padding: 0;
    height: 30rem;
}
.scroller {
    height: 30rem;
}

.recipe-item {
    height: 40px;
    padding: 0.1rem 1rem;
    cursor: pointer;

    .icon {
        margin-right: 0.5rem;
    }

    .label {
        font-weight: 600;
    }

    .hover-button {
        visibility: hidden;
    }

    .plus {
        font-weight: bold;
        font-size: 16px;
    }

    &:hover {
        background-color: rgba(222, 222, 255, 0.01);

        .hover-button {
            visibility: visible;
        }
    }
}
</style>
