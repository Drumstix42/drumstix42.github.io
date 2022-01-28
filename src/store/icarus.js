import { reactive } from 'vue';
import { defineStore } from 'pinia';

export const useIcarusStore = defineStore('icarus', {
    state: () => ({
        activeTabIndex: 0,
        tabs: [generateNewTab()],
    }),
    getters: {
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
            const matchingId = getMatchingTabId(id, this.tabs);

            if (matchingId !== -1) {
                this.tabs.splice(matchingId, 1);
            }

            // select previous tab if we delete the last one
            this.activeTabIndex--;

            // protect against out of bounds
            if (this.activeTabIndex < 0) {
                this.activeTabIndex = 0;
            }
        },
        setActiveTab(id) {
            this.activeTabIndex = id;
        },
        setTabTitle(id, title) {
            const matchingId = getMatchingTabId(id, this.tabs);
            if (matchingId !== -1) {
                this.tabs[matchingId].title = title;
            }
        },
    },
});

const generateTabId = () => Date.now();
const generateNewTab = () => reactive({
    id: generateTabId(),
    title: `Planning`,
    items: [],
});
const getMatchingTabId = (id, tabs) => tabs.findIndex((tab) => tab.id === id);
