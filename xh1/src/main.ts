import { createApp } from 'vue'
import '@/style/reset.scss'
import App from './App.vue'

//引入全局样式
import XhTop from '@/components/xh-top/index.vue';

import router from '@/router';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);

app.component('XhTop', XhTop);

app.use(router);
app.use(ElementPlus);
app.mount('#app');

