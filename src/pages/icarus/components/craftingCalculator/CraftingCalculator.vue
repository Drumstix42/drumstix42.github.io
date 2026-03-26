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

            <div class="items-scroll-area">
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
                                    <div class="label text-overflow-ellipsis" :data-item-id="item.id">{{ recipeData[item.id]?.label }}</div>
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
            </div>

            <div class="flex align-items-center mt-3">
                <h3>Components</h3>
            </div>
            <div class="p-1">
                <div class="ml-1">
                    <div class="flex align-items-center mb-2">
                        <n-switch class="mr-2" v-model:value="settings.splitRawComponents" />
                        <span>Split raw components</span> <span class="ml-2 text-muted">(may not cover all potential raws)</span>
                    </div>
                    <div class="flex align-items-center mb-2">
                        <n-switch class="mr-2" v-model:value="settings.includeSubComponents" />
                        <span>Include sub-components</span>
                    </div>
                    <div class="flex align-items-center mb-2 ml-3">
                        <n-switch class="mr-2" v-model:value="settings.includeStationComponents" size="small" />
                        <span>Include station components</span>
                    </div>
                </div>
                <div v-if="settings.splitRawComponents" class="mt-4">
                    <div>
                        <div class="components-section--label">Raw</div>
                        <em v-if="rawComponents.length === 0" class="empty-subcategory-label">No raw items</em>
                        <div v-for="item in rawComponents" :key="item.id" class="component-row flex align-items-center">
                            <div class="quantity">{{ item.quantity }}</div>
                            <div class="label" :data-item-id="item.id">{{ item.label }}</div>
                        </div>
                    </div>
                    <div class="mt-4">
                        <div class="components-section--label">Craftable</div>
                        <em v-if="craftableComponents.length === 0" class="empty-subcategory-label">No craftable items</em>
                        <div v-for="item in craftableComponents" :key="item.id" class="component-row flex align-items-center">
                            <div class="quantity">{{ item.quantity }}</div>
                            <div class="label" :data-item-id="item.id">{{ item.label }}</div>
                            <component-source-picker :component-id="item.id" @change="triggerCalc()"></component-source-picker>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div v-for="item in requiredComponents" :key="item.id" class="component-row flex align-items-center">
                        <div class="quantity">{{ item.quantity }}</div>
                        <div class="label" :data-item-id="item.id">{{ item.label }}</div>
                        <component-source-picker v-if="!item.isRaw" :component-id="item.id" @change="triggerCalc()"></component-source-picker>
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
import { itemLabelMap, isRawItem } from '@/utility/icarusData';
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
            requirementTrees: {
                primary: [],
                stations: [],
            },
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
        ...mapState(useIcarusStore, ['recipeData', 'itemStaticData', 'itemTableData', 'isLoadingRecipes', 'settings']),
        ...mapGetters(useIcarusStore, ['includeSubComponents', 'includeStationComponents', 'splitRawComponents']),
        craftableComponents() {
            return this.requiredComponents.filter((item) => !item.isRaw);
        },
        rawComponents() {
            return this.requiredComponents.filter((item) => item.isRaw);
        },
    },
    methods: {
        ...mapActions(useIcarusStore, ['setIncludeSubComponents', 'setIncludeStationComponents', 'setSplitRawComponents']),
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
            const itemStaticData = this.itemStaticData;
            const itemTableData = this.itemTableData;
            const includeSubComponents = this.includeSubComponents;
            const includeStationComponents = this.includeStationComponents;

            const requiredItemData = {};
            const requiredCraftingStations = new Set();

            const getComponentLabel = (componentId) =>
                recipeData[componentId]?.label ??
                itemLabelMap[componentId] ??
                itemTableData[itemStaticData[componentId]?.itemTableId]?.displayName ??
                componentId.replace(/_/g, ' ');

            const addToTotals = (totals, componentId, quantity) => {
                const existingQuantity = totals[componentId] ?? 0;
                totals[componentId] = existingQuantity + quantity;
            };

            const buildRequirementNode = (itemId, requestedQuantity, options = {}, activePath = new Set()) => {
                const { expandSubComponents = false, totals = {}, stations = new Set() } = options;

                const node = {
                    id: itemId,
                    quantity: requestedQuantity,
                    children: [],
                };

                if (activePath.has(itemId)) {
                    return node;
                }

                const recipe = recipeData[itemId];
                if (!recipe) {
                    return node;
                }

                node.recipeId = recipe.id;
                node.outputQuantity = recipe.outputQuantity || 1;
                node.preferredSource = recipe.preferredSource ?? null;

                if (node.preferredSource) {
                    stations.add(node.preferredSource);
                }

                const nextPath = new Set(activePath);
                nextPath.add(itemId);
                const multiplier = requestedQuantity / node.outputQuantity;

                (recipe.inputs || []).forEach((input) => {
                    const inputQuantity = input.quantity * multiplier;
                    addToTotals(totals, input.id, inputQuantity);

                    const child = {
                        id: input.id,
                        quantity: inputQuantity,
                        label: getComponentLabel(input.id),
                        isRaw: isRawItem(getComponentLabel(input.id)),
                    };
                    node.children.push(child);

                    if (expandSubComponents && recipeData[input.id] && !child.isRaw && !nextPath.has(input.id)) {
                        child.expanded = buildRequirementNode(input.id, inputQuantity, options, nextPath);
                    }
                });

                return node;
            };

            const primaryStations = new Set();
            const primaryTrees = selectedItems.map((item) =>
                buildRequirementNode(item.id, item.quantity ?? 1, {
                    expandSubComponents: includeSubComponents,
                    totals: requiredItemData,
                    stations: primaryStations,
                })
            );
            primaryStations.forEach((station) => requiredCraftingStations.add(station));

            const stationTrees = [];
            if (includeStationComponents) {
                const processedStations = new Set();

                while (true) {
                    const stationsToProcess = [...requiredCraftingStations].filter((station) => !processedStations.has(station));
                    if (stationsToProcess.length === 0) {
                        break;
                    }

                    stationsToProcess.forEach((station) => processedStations.add(station));

                    const iterationStations = new Set();
                    stationsToProcess.forEach((station) => {
                        stationTrees.push(
                            buildRequirementNode(station, 1, {
                                expandSubComponents: includeSubComponents,
                                totals: requiredItemData,
                                stations: iterationStations,
                            })
                        );
                    });

                    iterationStations.forEach((station) => requiredCraftingStations.add(station));
                }
            }

            this.requirementTrees = {
                primary: primaryTrees,
                stations: stationTrees,
            };

            const requiredComponents = Object.keys(requiredItemData).map((componentName) => {
                const roundedQuantity = Math.ceil(requiredItemData[componentName]);
                const label = getComponentLabel(componentName);
                return {
                    id: componentName,
                    quantity: roundedQuantity,
                    label,
                    isRaw: isRawItem(label),
                };
            });

            const sortedRequiredComponents = requiredComponents.sort((a, b) => {
                if (b.quantity !== a.quantity) return b.quantity - a.quantity;
                return a.label.localeCompare(b.label);
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
.items-scroll-area {
    max-height: 390px;
    overflow-y: auto;
    padding-right: 0.25rem;
}

.text-muted {
    font-size: 0.75rem;
    opacity: 0.6;
    line-height: 1.1rem;
    vertical-align: middle;
}
.recipe-item {
    min-height: 60px;
    padding: 0.3rem 0.3rem 0.4rem 0.3rem;
    border-radius: 4px;

    &.stations {
        min-height: 35px;
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
        background-color: rgba(222, 222, 255, 0.03);

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
    border-radius: 4px;

    .quantity {
        min-width: 2rem;
        text-align: right;
        margin-right: 0.5rem;
        flex-shrink: 0;
        font-weight: 500;
    }

    .label {
        min-width: 12rem;
    }

    &:hover {
        background-color: rgba(222, 222, 255, 0.03);
    }
}

.components-section--label {
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.5;
    margin-bottom: 0.25rem;
}

.empty-subcategory-label {
    font-size: 0.85rem;
    opacity: 0.6;
    margin-left: 1rem;
}
</style>
