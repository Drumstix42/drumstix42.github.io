import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { processRecipeData } from '@/utility/icarusData';

// utility methods
const generateTabId = () => Date.now();
const generateNewTab = () =>
    reactive({
        id: generateTabId(),
        title: `Planning`,
        items: [],
    });
const findTabIndex = (id, tabs) => tabs.findIndex((tab) => tab.id === id);

// default state
const defaultTab = generateNewTab();
const defaultTabId = defaultTab.id;

// * data store
export const useIcarusStore = defineStore('icarus', {
    state: () => ({
        activeTabId: defaultTabId,
        tabs: [defaultTab],

        recipeData: {},
        recipeOptions: [],
        isLoadingRecipes: false,

        recipeSearch: '',
    }),
    getters: {
        activeTab: (state) => state.tabs.find((tab) => tab.id === state.activeTabId),
        tabCount() {
            return this.tabs.length;
        },
        sortedRecipeOptions(state) {
            return state.recipeOptions.sort((a, b) => a.label.localeCompare(b.label));
        },
        filteredRecipeOptions(state) {
            if (state.recipeSearch) {
                const searchLabel = state.recipeSearch.toLowerCase();

                return this.sortedRecipeOptions.filter((item) => {
                    const label = item.label.toLowerCase();
                    return label.includes(searchLabel);
                });
            }
            return this.sortedRecipeOptions;
        },
    },
    actions: {
        // * tab methods
        addTab() {
            const tab = generateNewTab();
            this.tabs.push(tab);
            return tab;
        },
        removeTab(id) {
            const tabIndex = findTabIndex(id, this.tabs);

            if (tabIndex !== -1) {
                this.tabs.splice(tabIndex, 1);
            } else {
                console.error(`Could not find tab with id ${id}`, this.tabs);
                return;
            }

            const newTabIndex = Math.min(tabIndex, this.tabs.length - 1);

            // select previous tab if we delete the last one
            const newActiveTab = this.tabs[newTabIndex];
            this.activeTabId = newActiveTab.id;
        },
        setActiveTab(id) {
            this.activeTabId = id;
        },
        setTabTitle(id, title) {
            const matchingId = findTabIndex(id, this.tabs);
            if (matchingId !== -1) {
                this.tabs[matchingId].title = title;
            }
        },

        // * item list methods
        addItem(itemId, quantity = 1) {
            // implicitly adds or updates item to currently selected tab
            const currentTab = this.activeTab;

            if (currentTab) {
                const matchingItem = currentTab.items.find((item) => item.id === itemId);
                const outputQuantity = this.recipeData[itemId].outputQuantity ?? 1;

                if (matchingItem) {
                    matchingItem.quantity += outputQuantity;
                } else {
                    currentTab.items.push({
                        id: itemId,
                        quantity: outputQuantity,
                    });
                }
            } else {
                console.error(`Could not find tab with id ${this.activeTabId}`, this.tabs);
            }
        },
        removeItem(itemId) {
            // implicitly removes item from currently selected tab
            const currentTab = this.activeTab;

            if (currentTab) {
                const matchingItemIndex = currentTab.items.findIndex((item) => item.id === itemId);
                currentTab.items.splice(matchingItemIndex, 1);
            } else {
                console.error(`Could not find tab with id ${this.activeTabId}`, this.tabs);
            }
        },

        // * recipe data
        async loadRecipeData() {
            this.isLoadingRecipes = true;

            const response = await fetch(`/icarus-game/Data/Recipes.json`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const recipes = await response.json();
            const data = processRecipeData(recipes?.Rows);

            console.log(data);
            this.recipeData = data;
            this.recipeOptions = Object.values(data);
            this.isLoadingRecipes = false;
        },
    },
});
