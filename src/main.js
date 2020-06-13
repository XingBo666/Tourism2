// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import router from './router'

Vue.config.productionTip = false;

// import {get, post} from "./assets/js/axios.js";  // 引入axios 的 get，post 方法
// Vue.prototype.$get = get;
// Vue.prototype.$post = post;

import Axios from 'axios'


Vue.prototype.$http = Axios
Axios.defaults.baseURL = "http://localhost:8000"

import  "./assets/css/general.css"  // 引入全局通用样式
import "./assets/css/global.css"  // 引入全局公共样式

import global from "./assets/js/global.js"  // 引入全局公共方法
Vue.prototype.$global = global;

import cookie from "./assets/js/cookie.js"
Vue.prototype.$cookie = cookie;

import "@/assets/js/mock"  // 引入mock.js

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
