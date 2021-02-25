import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//导入初始化样式
import 'minireset.css';
//导入公共样式
import './assets/css/index.less';
//导入iconfont
import './assets/font/iconfont';
//导入公共方法
import utils from './utils';
//导入api
import * as api from './api/api';

Vue.prototype.utils = utils;
Vue.prototype.$api = api;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
