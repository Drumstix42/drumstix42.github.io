import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { create, NButton, NCard, NIcon, NTabPane, NTabs, NSelect, NTooltip } from 'naive-ui';

import 'primeflex/primeflex.css';

import '@/style/style.scss';

import App from '@/App.vue';
import router from '@/router/router.js';

const naive = create({
    components: [NButton, NCard, NIcon, NTabPane, NTabs, NSelect, NTooltip],
});

const app = createApp(App);

app.use(naive);
app.use(createPinia());
app.use(router);

app.mount('#app');
