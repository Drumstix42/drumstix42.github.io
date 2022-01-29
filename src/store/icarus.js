import { reactive } from 'vue';
import { defineStore } from 'pinia';

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

export const useIcarusStore = defineStore('icarus', {
    state: () => ({
        activeTabId: defaultTabId,
        tabs: [defaultTab],
    }),
    getters: {
        activeTab: (state) => state.tabs.find((tab) => tab.id === state.activeTabId),
        tabCount() {
            return this.tabs.length;
        },
    },
    actions: {
        addTab() {
            const tab = generateNewTab();
            this.tabs.push(tab);
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
    },
});
