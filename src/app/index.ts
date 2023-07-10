import Antd from 'ant-design-vue';
import { createApp } from 'vue';
import 'ant-design-vue/dist/antd.css';

import App from './app.vue';
import { router, store } from './providers';
import './index.scss';

createApp(App).use(store).use(router).use(Antd).mount('#app');
