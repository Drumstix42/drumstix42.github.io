import { createApp } from 'vue';
import { createPinia } from 'pinia';

import PrimeVue from 'primevue/config';
import PrimeButton from 'primevue/button';
import PrimeCard from 'primevue/card';
import PrimeTabView from 'primevue/tabview';
import PrimeTabPanel from 'primevue/tabpanel';

import 'primevue/resources/primevue.min.css';
// https://primefaces.org/primevue/showcase/#/setup -> Styles
import 'primevue/resources/themes/arya-blue/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

import '@/style/style.scss';

import App from '@/App.vue';
import router from '@/router/router.js';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue);

app.component('PButton', PrimeButton);
app.component('PCard', PrimeCard);
app.component('PTabView', PrimeTabView);
app.component('PTabPanel', PrimeTabPanel);

app.mount('#app');
