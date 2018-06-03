import Vue from "vue";
import Vuex from "vuex";
import * as auth from "./modules/auth";
import * as post from "./modules/posts";

Vue.use(Vuex);

const modules = {
  auth,
  post
};

export default new Vuex.Store({
  state: {
    modal: false,
    showMobileMenu: false,
    showEditor: false,
    siteKey: "6Ldcm1sUAAAAALDyu1f5Q60-fQbIDLrG5_i6F-ff"
  },
  getters: {
    modal: state => state.modal,
    showMobileMenu: state => state.showMobileMenu,
    showEditor: state => state.showEditor,
    siteKey: state => state.siteKey
  },
  mutations: {
    SET_MODAL_STATE(state, bool) {
      state.modal = bool;
    },
    TOGGLE_MOBILE(state, bool) {
      state.showMobileMenu = bool;
    },
    TOGGLE_EDITOR(state, bool) {
      state.showEditor = bool;
    }
  },
  actions: {
    setModal({ commit }, payload) {
      commit("SET_MODAL_STATE", payload);
    },
    toggleMobile({ state, commit }, bool) {
      commit("TOGGLE_MOBILE", bool);
    },
    toggleEditor({ commit }, bool) {
      commit("TOGGLE_EDITOR", bool);
    }
  },
  modules
});
