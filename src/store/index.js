import Vue from 'vue';
import Vuex from 'vuex';
import * as auth from './modules/auth';

Vue.use(Vuex);

const modules = {
    auth
};

export default new Vuex.Store({
    state: {
        modal: false,
        showMobileMenu: false
    },
    getters: {
        modal: state => state.modal,
        showMobileMenu: state => state.showMobileMenu,
    },
    mutations: {
        'SET_MODAL_STATE'(state, bool) {
            state.modal = bool;
        },
        'TOGGLE_MOBILE'(state, bool) {
            state.showMobileMenu = bool;
        },
    },
    actions: {
        setModal({ commit }, payload) {
            commit('SET_MODAL_STATE', payload);
        },
        toggleMobile({state, commit}, bool) {
            commit('TOGGLE_MOBILE', bool);
        }
    },
    modules
})