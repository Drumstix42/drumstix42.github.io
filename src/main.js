import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { create, NAlert, NButton, NCard, NIcon, NImage, NInput, NInputNumber, NTabPane, NTabs, NText, NSelect, NSpin, NTooltip } from 'naive-ui';
import VueVirtualScroller from 'vue-virtual-scroller';

import 'primeflex/primeflex.css';
import '@vueform/multiselect/themes/default.css';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

import '@/style/style.scss';

import App from '@/App.vue';
import router from '@/router/router.js';

const naive = create({
    components: [NAlert, NButton, NCard, NIcon, NImage, NInput, NInputNumber, NTabPane, NTabs, NText, NSelect, NSpin, NTooltip],
});

const app = createApp(App);

app.use(naive);
app.use(createPinia());
app.use(router);
app.use(VueVirtualScroller);

app.mount('#app');
