import { createApp } from 'vue';
import { createPinia } from 'pinia';
import {
    create,
    NAlert,
    NButton,
    NButtonGroup,
    NCard,
    NIcon,
    NImage,
    NInput,
    NInputNumber,
    NTabPane,
    NTabs,
    NTag,
    NText,
    NSelect,
    NSpin,
    NSwitch,
    NTooltip,
} from 'naive-ui';
import VueVirtualScroller from 'vue-virtual-scroller';

import 'primeflex/primeflex.css';
import '@vueform/multiselect/themes/default.css';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

import '@/style/style.scss';

import App from '@/pages/icarus/Index.vue';

const naive = create({
    components: [
        NAlert,
        NButton,
        NButtonGroup,
        NCard,
        NIcon,
        NImage,
        NInput,
        NInputNumber,
        NTabPane,
        NTabs,
        NTag,
        NText,
        NSelect,
        NSpin,
        NSwitch,
        NTooltip,
    ],
});
const pinia = createPinia();
const app = createApp(App);

app.use(naive);
app.use(pinia);
app.use(VueVirtualScroller);

app.mount('#app');
