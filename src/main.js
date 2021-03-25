// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import './router/permission.js'
import store from './store';
import Router from 'vue-router';
import axios from 'axios';
import './util/http';
import ElementUI from 'element-ui'

Vue.use(ElementUI)
Vue.use(Router);
Vue.config.productionTip = false;
Vue.prototype.$ajax = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
