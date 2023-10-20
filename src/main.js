import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap-icons/font/bootstrap-icons.css'

const pinia = createPinia();

createApp(App).use(pinia).mount('#app')
