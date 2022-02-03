<template>
    <div>
        <div class="mb-3">
            <n-input type="text" v-model:value="searchValue" placeholder="Search..." clearable @input="onSearch" />
        </div>
        <n-spin :show="isLoadingRecipes">
            <n-card class="scroll-wrap" content-style="padding: 0;">
                <RecycleScroller class="scroller" :items="filteredRecipeOptions" :item-size="40" key-field="id" v-slot="{ index, item }">
                    <div class="recipe-item flex align-items-center" @click="addItem(item.id)">
                        <n-image
                            class="icon"
                            width="32"
                            :src="`/Icarus/ItemIcons/ITEM_${item.id}.png`"
                            fallback-src="/Icarus/Images/question-mark.png"
                            :preview-disabled="true"
                        />
                        <div class="flex-shrink" style="min-width: 0">
                            <div class="label text-overflow-ellipsis">{{ item.label }}</div>
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
        ...mapState(useIcarusStore, ['isLoadingRecipes', 'filteredRecipeOptions']),
    },
    methods: {
        ...mapActions(useIcarusStore, ['addItem']),
        onSearch: debounce((value) => {
            icarusStore.recipeSearch = value;
        }, 100),
    },
};
</script>

<style scoped lang="scss">
.scroll-wrap {
    padding: 0;
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
