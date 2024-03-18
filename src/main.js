import { createApp } from 'vue';
import App from './App.vue';
import './styles/general.scss';
import { router } from './router.js';

createApp(App).use(router).mount('#app');
