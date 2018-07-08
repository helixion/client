// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VeeValidate from "vee-validate";
import Toasted from "vue-toasted";
import App from "./App";
import router from "./router";
import store from "./store";
import axios from "axios";

Vue.config.productionTip = false;

Vue.use(VeeValidate, { inject: false });
Vue.use(Toasted, {
  iconPack: "fontawesome"
});

const namespace = "v1";
axios.defaults.baseURL = "http://localhost:3000/" + namespace;
axios.defaults.timeout = 3000;


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
  },

  '$discourse': {
    get() {
      return {
        url: "localhost",
        port: 1337
      };
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"  
});
