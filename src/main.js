import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import PrimeButton from 'primevue/button';

import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/arya-blue/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

import '@/style/style.scss';

import App from '@/App.vue';
import router from '@/router/router.js';

const app = createApp(App);

app.use(PrimeVue);
app.use(router);

app.component('P-Button', PrimeButton);

app.mount('#app');
