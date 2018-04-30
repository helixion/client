// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import Notifications from 'vue-notification'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

Vue.use(VeeValidate, { inject: false });
Vue.use(Notifications);

const namespace = 'v1';
axios.defaults.baseURL = 'http://localhost:3000/' + namespace;

Object.defineProperties(Vue.prototype, {
  '$http': {
    get() {
      return axios;
    }
  },

  axios: {
    get() {
      return axios;
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
})
