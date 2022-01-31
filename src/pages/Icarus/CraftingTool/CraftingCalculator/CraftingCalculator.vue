<template>
    <div>
        <div v-if="tab.items.length > 0">
            <div class="flex align-items-center">
                <h3>Items</h3>
                <n-tooltip trigger="hover">
                    <template #trigger>
                        <n-button class="ml-3" size="tiny" secondary circle type="default" @click="sortInputs">
                            <n-icon size="13">
                                <SortAlphaDown></SortAlphaDown>
                            </n-icon>
                        </n-button>
                    </template>
                    Sort items alphabetically
                </n-tooltip>
            </div>

            <transition-group x-appear name="list" tag="div">
                <div v-for="item in tab.items" class="recipe-item flex align-items-center" :key="item.value">
                    <n-input-number
                        class="input-quantity flex-shrink-0"
                        v-model:value="item.quantity"
                        placeholder="Quantity"
                        :min="0"
                        :validator="validateQuantity"
                        :on-update-value="onQuantityChange(item)"
                    />
                    <n-image
                        class="icon"
                        width="32"
                        :src="`/Icarus/ItemIcons/ITEM_${recipeData[item.value].label}.png`"
                        fallback-src="/Icarus/Images/question-mark.png"
                        :preview-disabled="false"
                    />
                    <div class="flex-shrink" style="min-width: 0">
                        <div class="label text-overflow-ellipsis">{{ recipeData[item.value].label }}</div>
                    </div>
                    <n-tooltip trigger="hover">
                        <template #trigger>
                            <n-button class="hover-button ml-auto" secondary type="error" size="small" @click="removeItem(item)">
                                <n-icon size="13">
                                    <Times></Times>
                                </n-icon>
                            </n-button>
                        </template>
                        Remove from list
                    </n-tooltip>
                </div>
            </transition-group>

            <div class="flex align-items-center mt-3">
                <h3>Required Components</h3>
            </div>

            <div>
                <div v-for="(quantity, key) in requiredItemData">{{ quantity }} {{ key }}</div>
            </div>
        </div>

        <div v-else class="mb-3">
            <h3>No Items</h3>
            <n-text type="info">You haven't added any items to this list yet.</n-text>
        </div>
    </div>
</template>

<script>
import { mapState } from 'pinia';
import { SortAlphaDown, Times } from '@vicons/fa';

import { useIcarusStore } from '@/store/icarus';

export default {
    name: 'CraftingToolCalculator',
    components: {
        SortAlphaDown,
        Times,
    },
    props: {
        tab: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            requiredItemData: {},
        };
    },
    computed: {
        ...mapState(useIcarusStore, ['recipeData']),
    },
    methods: {
        sortInputs() {
            this.tab.items.sort((a, b) => {
                const aLabel = this.recipeData[a.value].label;
                const bLabel = this.recipeData[b.value].label;

                if (aLabel < bLabel) {
                    return -1;
                }

                if (aLabel > bLabel) {
                    return 1;
                }

                return 0;
            });
        },
        onQuantityChange(item) {
            if (item.quantity < 1) {
                this.$nextTick(() => {
                    this.removeItem(item);
                    this.calculateRequiredItems();
                });
            } else {
                this.$nextTick(() => {
                    this.calculateRequiredItems();
                });
            }
        },
        validateQuantity(value) {
            return Number.isInteger(value);
        },
        removeItem(item) {
            const itemIndex = (this.tab.items || []).findIndex((i) => i.value === item.value);
            if (itemIndex > -1) {
                this.tab.items.splice(itemIndex, 1);
            }
        },
        calculateRequiredItems() {
            const requiredItemData = {};

            (this.tab.items || []).forEach((item) => {
                const itemData = this.recipeData[item.value];
                const multiplier = item.quantity;

                (itemData.inputs || []).forEach((input) => {
                    if (requiredItemData[input.itemName]) {
                        requiredItemData[input.itemName] += input.quantity * multiplier;
                    } else {
                        requiredItemData[input.itemName] = input.quantity * multiplier;
                    }
                });
            });

            this.requiredItemData = requiredItemData;
        },
    },
};
</script>

<style scoped lang="scss">
.recipe-item {
    height: 40px;
    padding: 0.1rem 0.3rem;

    .input-quantity {
        width: 8rem;
    }

    .icon {
        margin: 0 0.5rem;
    }

    .label {
        font-weight: 600;
    }

    .hover-button {
        visibility: hidden;
    }

    &:hover {
        background-color: rgba(222, 222, 255, 0.01);

        .hover-button {
            visibility: visible;
        }
    }
}

.list-enter-active,
.list-leave-active {
    transition: all 0.2s ease;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}
.list-move {
    transition: transform 0.5s ease;
}
</style>
