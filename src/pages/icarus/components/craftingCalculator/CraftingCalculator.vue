<template>
    <div>
        <div v-if="!isLoadingRecipes && tab.items.length > 0">
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
                <div v-for="item in tab.items" class="recipe-item flex align-items-center" :key="item.id">
                    <div class="relative flex align-items-center mr-1">
                        <n-image
                            class="icon"
                            width="45"
                            :src="`${gameAssetsUrl}/ItemIcons/${recipeData[item.id]?.iconPath}.png`"
                            :fallback-src="`${gameAssetsUrl}/Images/question-mark.png`"
                            :preview-disabled="false"
                        />
                        <div v-if="recipeData[item.id]?.outputQuantity > 1" class="item-counter">x{{ recipeData[item.id].outputQuantity }}</div>
                    </div>
                    <div class="flex-grow-1">
                        <div class="flex align-items-center pb-1">
                            <div class="flex-shrink">
                                <div class="label text-overflow-ellipsis">{{ recipeData[item.id].label }}</div>
                            </div>
                        </div>
                        <div class="flex align-items-center flex-grow-1">
                            <n-input-number
                                class="input-quantity flex-shrink-0"
                                v-model:value="item.quantity"
                                placeholder="Quantity"
                                :min="0"
                                :max="100000"
                                :step="recipeData[item.id]?.outputQuantity ?? 1"
                                :validator="validateQuantity"
                                :on-update-value="onQuantityChange(item)"
                            />
                            <component-source-picker :component-id="item.id" @change="triggerCalc()"></component-source-picker>
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
                    </div>
                </div>
            </transition-group>

            <div class="flex align-items-center mt-3">
                <h3>Components</h3>
            </div>
            <div class="p-1">
                <div class="flex align-items-center mb-1">
                    <n-switch class="mr-2" v-model:value="settings.includeSubComponents" size="small" />
                    <span>Include sub-components</span>
                </div>
                <div class="flex align-items-center mb-3 ml-3">
                    <n-switch class="mr-2" v-model:value="settings.includeStationComponents" size="small" />
                    <span>Include station components</span>
                </div>
                <div>
                    <div v-for="item in requiredComponents" :key="item.id" class="component-row flex align-items-center">
                        <div class="label">{{ item.quantity }} {{ recipeData[item.id]?.label ?? itemLabelMap[item.id] ?? item.id }}</div>
                        <component-source-picker :component-id="item.id" @change="triggerCalc()"></component-source-picker>
                    </div>
                </div>
            </div>

            <div class="flex align-items-center">
                <h3>Crafting Stations</h3>
            </div>
            <div class="">
                <div v-for="componentName in requiredCraftingStations" class="recipe-item stations pl-0 flex align-items-center">
                    <div class="flex align-items-center">
                        <n-image
                            class="icon"
                            width="32"
                            :src="`${gameAssetsUrl}/ItemIcons/${recipeData[componentName]?.iconPath}.png`"
                            :fallback-src="`${gameAssetsUrl}/Images/question-mark.png`"
                            :preview-disabled="false"
                        />
                        <div class="label">{{ recipeData[componentName]?.label ?? itemLabelMap[componentName] ?? componentName }}</div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="mb-3">
            <h3>No Items</h3>
            <n-text type="info">You haven't added any items to this list yet.</n-text>
        </div>
    </div>
</template>

<script>
import debounce from 'debounce';
import { mapActions, mapGetters, mapState } from 'pinia';
import { SortAlphaDown, Times } from '@vicons/fa';

import ComponentSourcePicker from './ComponentSourcePicker.vue';
import { useIcarusStore } from '@/store/icarus';
import { itemLabelMap } from '@/utility/icarusData';
import { GAME_ASSETS_URL } from '@/constants/common';

export default {
    name: 'CraftingToolCalculator',
    components: {
        ComponentSourcePicker,
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
            itemLabelMap: itemLabelMap,
            gameAssetsUrl: GAME_ASSETS_URL,
            requiredItemData: {},
            requiredCraftingStations: [],
            requiredComponents: [],
        };
    },
    watch: {
        includeSubComponents(newValue) {
            if (!newValue) {
                this.setIncludeStationComponents(false);
            }
            this.triggerCalc();
        },
        includeStationComponents(newValue) {
            if (newValue) {
                this.setIncludeSubComponents(true);
            }
            this.triggerCalc();
        },
    },
    computed: {
        ...mapState(useIcarusStore, ['recipeData', 'itemTableData', 'isLoadingRecipes', 'settings']),
        ...mapGetters(useIcarusStore, ['includeSubComponents', 'includeStationComponents']),
    },
    methods: {
        ...mapActions(useIcarusStore, ['setIncludeSubComponents', 'setIncludeStationComponents']),
        sortInputs() {
            this.tab.items.sort((a, b) => {
                const aLabel = this.recipeData[a.id].label;
                const bLabel = this.recipeData[b.id].label;
                return aLabel.localeCompare(bLabel);
            });
        },
        onQuantityChange(item) {
            if (item.quantity < 1) {
                this.$nextTick(() => {
                    this.removeItem(item);
                    this.triggerCalc();
                });
            } else {
                this.$nextTick(() => {
                    this.triggerCalc();
                });
            }
        },
        validateQuantity(value) {
            return Number.isInteger(value);
        },
        removeItem(item) {
            const itemIndex = (this.tab.items || []).findIndex((i) => i.id === item.id);
            if (itemIndex > -1) {
                this.tab.items.splice(itemIndex, 1);
            }
        },
        triggerCalc: debounce(function () {
            this.calculateRequiredItems();
        }, 100),
        calculateRequiredItems() {
            const selectedItems = this.tab.items || [];
            const recipeData = this.recipeData;
            const includeSubComponents = this.includeSubComponents;
            const includeStationComponents = this.includeStationComponents;

            const requiredItemData = {};
            const requiredCraftingStations = new Set([]);

            function sumInputsForItems(items = [], dataMap = {}) {
                items.forEach((item) => {
                    const itemData = recipeData[item.id];
                    if (!itemData) {
                        return;
                    }

                    const multiplier = (item.quantity ?? 1) / itemData.outputQuantity;

                    (itemData.inputs || []).forEach((input) => {
                        const quantity = dataMap[input.id] ?? 0;
                        dataMap[input.id] = quantity + input.quantity * multiplier;

                        const inputItemData = recipeData[input.id];
                        if (includeSubComponents && inputItemData) {
                            // recursion is fun
                            sumInputsForItems([{ id: input.id, quantity: input.quantity * multiplier }], dataMap);
                        }
                    });
                });
                return dataMap;
            }

            function populateCraftingStations() {
                const populateCraftingStation = (itemName) => {
                    const itemData = recipeData[itemName];
                    if (itemData?.preferredSource) {
                        requiredCraftingStations.add(itemData.preferredSource);
                    }
                };
                selectedItems.map((item) => item.id).forEach(populateCraftingStation);
                Object.keys(requiredItemData).forEach(populateCraftingStation);
            }

            sumInputsForItems(selectedItems, requiredItemData);
            populateCraftingStations();

            if (includeStationComponents) {
                sumInputsForItems(
                    [...requiredCraftingStations].map((station) => ({ id: station })),
                    requiredItemData
                );

                // more crafting stations may now be required due to sub-component recipes
                populateCraftingStations();
            }

            const requiredComponents = Object.keys(requiredItemData).map((componentName) => {
                const roundedQuantity = Math.ceil(requiredItemData[componentName]);
                return {
                    id: componentName,
                    quantity: roundedQuantity,
                };
            });

            const sortedRequiredComponents = requiredComponents.sort((a, b) => {
                return b.quantity - a.quantity;
            });

            // transform set into array
            this.requiredCraftingStations = [...requiredCraftingStations].sort((a, b) => {
                const aLabel = recipeData[a]?.label ?? itemLabelMap[a] ?? a;
                const bLabel = recipeData[b]?.label ?? itemLabelMap[b] ?? b;
                return aLabel.localeCompare(bLabel);
            });
            this.requiredItemData = requiredItemData;
            this.requiredComponents = sortedRequiredComponents;
        },
    },
};
</script>

<style scoped lang="scss">
.recipe-item {
    min-height: 60px;
    padding: 0.5rem 0.3rem;

    &.stations {
        min-height: 40px;
    }

    .input-quantity {
        width: 5.5rem;
        margin-right: 0.5rem;
    }

    .icon {
        margin: 0 0.5rem 0 0;
    }

    .label-wrap {
        width: 9rem;
        min-width: 2.5rem;
    }

    .label {
        font-weight: 600;
        line-height: 18px;
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

.component-row {
    min-height: 1.7rem;

    .label {
        min-width: 12rem;
    }
}
</style>
