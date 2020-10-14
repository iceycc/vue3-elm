import { createApp } from 'vue'
import App from './App.vue'
import './index.scss'
import './config/rem'
import store from './store'
// @ts-ignore
import * as FastClick from 'fastclick'
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        // FastClick.attach(document.body); // todo
    }, false);
}
import router from './router'
createApp(App).use(router).use(store).mount('#app')
