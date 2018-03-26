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
        showMobileMenu: false,
        header: true
    },
    getters: {
        modal: state => state.modal,
        showMobileMenu: state => state.showMobileMenu,
        header: state => state.header
    },
    mutations: {
        'SET_MODAL_STATE'(state, bool) {
            state.modal = bool;
        },
        'TOGGLE_MOBILE'(state, bool) {
            state.showMobileMenu = bool;
        },
        'TOGGLE_HEADER'(state, bool) {
            state.header = bool;
        }
    },
    actions: {
        setModal({ commit }, payload) {
            commit('SET_MODAL_STATE', payload);
        },
        toggleMobile({state, commit}) {
            commit('TOGGLE_MOBILE', !state.showMobileMenu);
        },
        toggleHeader({state, commit}) {
            commit('TOGGLE_HEADER', !state.header);
        }
    },
    modules
})