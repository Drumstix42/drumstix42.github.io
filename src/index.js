import { createApp } from 'vue';
import { create } from 'naive-ui';

import 'primeflex/primeflex.css';
import '@/style/style.scss';

import App from '@/Index.vue';

const naive = create({
    components: [],
});

const app = createApp(App);

app.use(naive);

app.mount('#app');
